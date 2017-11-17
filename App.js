import React from 'react';
import {Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import {Switch} from 'react-native-switch';

import {Game} from "build-a-simon-game";
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
            <View style={[styles.container, styles.App]}>
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
        const evaluatedClassName = (("colourKey" in this.props) ? containersColours[this.props.colourKey] : "");

        return (
            <View style={[styles["App-container"], styles[evaluatedClassName]]}>
                {this.props.children}
            </View>
        )
    }
}

class Dashboard extends React.Component {
    render() {
        const isRestartDisabled = this.props.isRestartDisabled;
        const startButton = isRestartDisabled ? (
            <Container>
                <Text style={[styles["App-title-text"]]}>
                    Watch
                </Text>
            </Container>
        ) : (
            <StartButton updateState={this.props.onUpdateStateFromRestart}
                         isDisabled={isRestartDisabled}/>
        );

        return (
            <View style={styles["Dashboard"]}>
                <Container>
                    <Score score={this.props.score}/>
                </Container>
                <Container>
                    <StrictSwitch/>
                </Container>
                {startButton}
            </View>
        );
    }
}

class ButtonsPanel extends React.Component {
    render() {
        return (
            <View style={styles["ButtonPanel"]}>
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
            <View style={styles["App-title"]}>
                <Text style={styles["App-title-text"]}>Simon® Game</Text>
            </View>
        );
    }
}

class Score extends React.Component {
    render() {
        return (
            <View style={styles["center"]}>
                <Text style={styles["App-title-text"]}>{this.props.score}</Text>
            </View>
        );
    }
}

class StrictSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: false};
    }

    render() {
        return (
            <View style={styles["center"]}>
                <Switch value={this.state.value}
                        onValueChange={value => {
                            this.setState({value});
                            game.toggleStrict();
                        }}
                        activeText={'Strict'}
                        inActiveText={'Simple'}
                />
            </View>
        );
    }
}

class StartButton extends React.Component {
    render() {
        const text = this.props.isDisabled ? "Watch" : "Restart";

        return (
            <View style={styles["startButton"]}>
                <Touchable
                    onPress={() => {
                        const updateState = this.props.updateState;
                        performRestart(updateState)
                            .then(() => performDemo(updateState));
                    }}
                    style={[{
                        backgroundColor: '#05A5D1',
                        paddingVertical: 12,
                        paddingHorizontal: 10,
                        borderRadius: 5
                    },
                        styles["btn"],
                        styles["btn-default"]
                    ]}
                    background={Touchable.Ripple('#0075A1')}
                    disabled={this.props.isDisabled}
                >
                    <Text style={styles["App-title-text"]}>{text}</Text>
                </Touchable>
            </View>
        );
    }
}

class GameButton extends React.Component {
    render() {
        let btnClassName = (this.props.colour in BUTTON_COLOUR_MAPPING) ? BUTTON_COLOUR_MAPPING[this.props.colour] : "btn-default";
        let displayColour = this.props.isDisabled ? "grey" : this.props.colour;

        return (
            <View>
                <Touchable
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
                    style={[{
                        backgroundColor: displayColour,
                        paddingVertical: 20,
                        paddingHorizontal: 20,
                    }, styles["btn"], styles[btnClassName]]}
                    background={Touchable.Ripple("grey")}
                    disabled={this.props.isDisabled}
                >
                    <Text/>
                </Touchable>
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

function flashAll(triggerDisplayRefresh, colour = "", times = 1, interval = 100) {
    return new Array(times).fill(0)
        .reduce(prev => prev.then(() =>
            new Promise(flashDone =>
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
                }))), Promise.resolve())

}

export {Container, Dashboard, ButtonsPanel, Title, Score, StrictSwitch, StartButton, GameButton};
