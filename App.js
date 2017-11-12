import React from 'react';
import {Button, Switch, Text, View} from 'react-native';

import Game from "./build_a_simon_game/src/game";
import styles from "./styles/App.styles";

const game = new Game();

const COLOUR_AUDIOS = (function mockAudioIfAbsent() {
    if (typeof Audio === "undefined") {
        let mockAudio = {
            "play": () => {
            }
        };
        return ["red", "green", "blue", "yellow"].reduce((prev, colour) => {
            prev[colour] = mockAudio;
            return prev;
        }, {});
    } else {
        return {
            "red": new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
            "green": new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
            "blue": new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
            "yellow": new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
        };
    }
})();


const BUTTON_COLOUR_MAPPING = {
    "red": "btn-danger",
    "green": "btn-success",
    "blue": "btn-primary",
    "yellow": "btn-warning"
};

const COLOURS_CSS_CLASSES = {
    'RED': "bg-colour-red",
    'GREEN': "bg-colour-green",
    'BLUE': "bg-colour-blue",
    'YELLOW': "bg-colour-yellow",
    'WHITE': "bg-colour-white",
    'BLACK': "bg-colour-black",
};

const containersColours = {
    'red': "",
    "green": "",
    "blue": "",
    "yellow": "",
};

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'score': game.getFormattedScore(),
            'status': game.status(),
            'areButtonsDisabled': game.isInputDisabled(),
            'isRestartDisabled': game.isRestartDisabled()
        };
        this.updateState = this.updateState.bind(this)
    }

    updateState() {
        this.setState({
            'score': game.getFormattedScore(),
            'status': game.status(),
            'areButtonsDisabled': game.isInputDisabled(),
            'isRestartDisabled': game.isRestartDisabled()
        })
    }

    render() {
        return (
            <View style={styles.container} className="App">
                <Title/>
                <Dashboard onUpdateStateFromRestart={this.updateState}
                           score={this.state.score}
                           isRestartDisabled={this.state.isRestartDisabled}/>
                <ButtonsPanel areButtonsDisabled={this.state.areButtonsDisabled}
                              onUpdateStateFromGameButton={this.updateState}/>
            </View>
        );
    }
}

class Container extends React.Component {
    render() {
        const evaluatedClassNames = "App-container " + (("colourKey" in this.props) ? containersColours[this.props.colourKey] : "");

        return (
            <View className={evaluatedClassNames}>
                {this.props.children}
            </View>
        )
    }
}

class Dashboard extends React.Component {
    render() {
        return (
            <View className="Dashboard">
                <Container>
                    <Score score={this.props.score}/>
                </Container>
                <Container>
                    <StrictSwitch/>
                </Container>
                <Container>
                    <StartButton updateState={this.props.onUpdateStateFromRestart}
                                 isDisabled={this.props.isRestartDisabled}/>
                </Container>
            </View>
        );

    }
}

class ButtonsPanel extends React.Component {
    render() {
        return (
            <View className="ButtonPanel">
                {
                    [
                        'red',
                        'green',
                        'blue',
                        'yellow'
                    ].map((colour) =>
                        <Container key={colour} colourKey={colour}>
                            <GameButton colour={colour} isDisabled={this.props.areButtonsDisabled}
                                        updateState={this.props.onUpdateStateFromGameButton}/>
                        </Container>
                    )
                }
            </View>
        );
    }
}

class Title extends React.Component {
    render() {
        return (
            <View className="App-title">
                <Text>Simon® Game</Text>
            </View>
        );
    }
}

class Score extends React.Component {
    render() {
        return (
            <View>
                <Text>{this.props.score}</Text>
            </View>
        );
    }
}

class StrictSwitch extends React.Component {
    // componentDidMount() {
    //     window.$("[name='strict-mode-checkbox']").bootstrapSwitch();
    //     window.$("[name='strict-mode-checkbox']").on('switchChange.bootstrapSwitch', (event, state) => game.toggleStrict());
    //
    // }

    render() {
        return (
            <View>
                <Switch onValueChange={(event, state) => game.toggleStrict()}/>
                {/*<CheckBox type="checkbox" name="strict-mode-checkbox" data-label-text="Strict" data-on-color="warning"/>*/}
            </View>
        );
    }
}

class StartButton extends React.Component {
    render() {
        return (
            <View>
                <Button type="button" className="btn btn-default" disabled={this.props.isDisabled}
                        title="Restart"
                        onPress={() => {
                            const updateState = this.props.updateState;
                            performRestart(updateState)
                                .then(() => performDemo(updateState));
                        }}
                />
            </View>
        );
    }
}

class GameButton extends React.Component {
    render() {
        let btnClassName = (this.props.colour in BUTTON_COLOUR_MAPPING) ? BUTTON_COLOUR_MAPPING[this.props.colour] : "btn-default";

        return (
            <View>
                <Button type="button" className={"btn GameButton " + btnClassName} disabled={this.props.isDisabled}
                        onPress={() => {
                            const updateState = this.props.updateState;

                            COLOUR_AUDIOS[this.props.colour].play();

                            game.buttons()[this.props.colour]({
                                "correctCallback": () => {
                                    updateState();
                                },
                                "scoreCallback": () => {
                                    updateState();
                                    flashAll(updateState, COLOURS_CSS_CLASSES.WHITE, 3)
                                        .then(() => wait(500))
                                        .then(() => performDemo(updateState));
                                },
                                "winCallback": () => {
                                    updateState();
                                    Object.keys(COLOURS_CSS_CLASSES).reduce((prev, colour) => {
                                        return prev.then(() => new Promise(resolved => {
                                            flashAll(updateState, COLOURS_CSS_CLASSES[colour], 1, 150)
                                                .then(() => resolved());
                                        }));
                                    }, Promise.resolve())
                                },
                                "wrongCallback": () => {
                                    updateState();
                                    flashAll(updateState, COLOURS_CSS_CLASSES.BLACK, 3)
                                        .then(() => wait(500))
                                        .then(() => performDemo(updateState));
                                },
                                "restartCallback": () => {
                                    performRestart(updateState)
                                        .then(() => performDemo(updateState));
                                }
                            });
                        }}
                        title=""
                />
            </View>
        );
    }
}

function wait(timeout, runBeforeTimeout) {
    return new Promise(resolve => {
        if (typeof runBeforeTimeout === "function") {
            runBeforeTimeout();
        }
        setTimeout(() => {
            resolve()
        }, timeout);
    })
}

function setAllContainersColoursTo(colour) {
    Object.keys(containersColours).forEach(key => containersColours[key] = colour);
}

function performRestart(updateState) {
    return new Promise(notifiedRestart => {
        game.notifyStatus().restart();
        updateState();
        notifiedRestart();
    }).then(() => new Promise(animationDone => restartingAnimation(updateState, animationDone)
    )).then(() => new Promise(notifiedRestarted => {
        game.notifyStatus().started();
        updateState();
        notifiedRestarted();
    }));
}

function performDemo(updateState) {
    return new Promise(demoDone => demoAnimation(game.getSequenceAsLowerCaseStrings(), updateState, demoDone)).then(() => {
        game.notifyStatus().demoed();
        updateState();
        return Promise.resolve();
    });
}

function restartingAnimation(triggerDisplayRefresh, animationDone) {
    wait(500, () => {
        setAllContainersColoursTo(COLOURS_CSS_CLASSES.WHITE);
        triggerDisplayRefresh();
    }).then(() => {
        setAllContainersColoursTo("");
        triggerDisplayRefresh();
        wait(500).then(() => animationDone());
    });
}

function demoAnimation(sequence, triggerDisplayRefresh, allDemosDone) {
    sequence.reduce((prev, colour) => {
        return prev.then(() => new Promise(demoDone => {
            wait(500, () => {
                console.log("colour: " + colour);
                setAllContainersColoursTo("");
                containersColours[colour] = COLOURS_CSS_CLASSES[colour.toUpperCase()];
                COLOUR_AUDIOS[colour].play();
                triggerDisplayRefresh();
            }).then(() => {
                wait(300, () => {
                    setAllContainersColoursTo("");
                    triggerDisplayRefresh();
                }).then(() => {
                    demoDone()
                });
            })
        }))
    }, Promise.resolve())
        .then(() => {
            wait(200, () => {
                setAllContainersColoursTo("");
                triggerDisplayRefresh();
            }).then(() => allDemosDone());
        });
}

function flashAll(triggerDisplayRefresh, colour, times, interval) {
    colour = colour || "";
    times = times || 1;
    interval = interval || 100;
    return new Array(times).fill(0)
        .reduce((prev) => {
            return prev.then(() => new Promise(flashDone => {
                wait(interval, () => {
                    console.log("colour: " + colour);
                    setAllContainersColoursTo("");
                    setAllContainersColoursTo(colour);
                    triggerDisplayRefresh();
                }).then(() => {
                    wait(interval, () => {
                        setAllContainersColoursTo("");
                        triggerDisplayRefresh();
                    }).then(() => {
                        flashDone()
                    });
                })
            }))
        }, Promise.resolve())

}

export {Container, Dashboard, ButtonsPanel, Title, Score, StrictSwitch, StartButton, GameButton};
