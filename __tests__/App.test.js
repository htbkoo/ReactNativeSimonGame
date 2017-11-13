import React from 'react';
import {shallow} from 'enzyme';
import chai from 'chai';
import format from 'string-format';

import sinon from 'sinon';
import sinonTest from 'sinon-test';
sinon.test = sinonTest.configureTest(sinon);
sinon.testCase = sinonTest.configureTestCase(sinon);

import SimonGameApp, {Dashboard, ButtonsPanel, Title, Score, StrictSwitch, StartButton, Container, GameButton} from '../App';
import Game from '../build_a_simon_game/src/game';

describe("SimonGame - FreeCodeCamp", function () {
    "use strict";
    describe("FrontEnd - Advanced Project", function () {
        describe("SimonGame", function () {
            describe("<SimonGameApp/>", function () {
                it("should contain <Title/>, <Dashboard/> and <ButtonsPanel/>", function () {
                    // Given
                    const wrapperApp = shallow(<SimonGameApp/>);

                    // When
                    // Then
                    chai.expect(wrapperApp.containsAllMatchingElements([
                        <Title/>,
                        <Dashboard/>,
                        <ButtonsPanel/>
                    ])).to.equal(true, "<SimonGameApp/> should contain <Title/>, <Dashboard/> and <ButtonsPanel/>");
                });

                it("should set score and status obtained from game on construction", sinon.test(function () {
                    // Given
                    this.stub(Game.prototype, "getFormattedScore").returns(0);
                    this.stub(Game.prototype, "status").returns("initial Status");
                    this.stub(Game.prototype, "isInputDisabled").returns(true);
                    this.stub(Game.prototype, "isRestartDisabled").returns(false);

                    // When
                    const wrapperApp = shallow(<SimonGameApp/>);

                    // Then
                    chai.expect(wrapperApp.state().score).to.equal(0);
                    chai.expect(wrapperApp.state('status')).to.equal("initial Status");

                }));

                it("should pass onUpdateStateFromRestart callback to Dashboard which would trigger state reset", sinon.test(function () {
                    // Given
                    this.stub(Game.prototype, "getFormattedScore")
                        .onFirstCall().returns(0)
                        .onSecondCall().returns(100);
                    this.stub(Game.prototype, "status")
                        .onFirstCall().returns("initial")
                        .onSecondCall().returns("someStatus");
                    this.stub(Game.prototype, "isInputDisabled")
                        .onFirstCall().returns(true)
                        .onSecondCall().returns(false);
                    this.stub(Game.prototype, "isRestartDisabled")
                        .returns(false);

                    // When
                    const wrapperApp = shallow(<SimonGameApp/>);

                    const wrapperDashboard = wrapperApp.find("Dashboard").get(0);
                    wrapperDashboard.props.onUpdateStateFromRestart();

                    // Then
                    chai.expect(wrapperApp.state().score).to.equal(100);
                    chai.expect(wrapperApp.state().status).to.equal("someStatus");
                }));

                it("should pass score to Dashboard", sinon.test(function () {
                    // Given
                    this.stub(Game.prototype, "getFormattedScore").returns("someScore");

                    // When
                    const wrapperApp = shallow(<SimonGameApp/>);

                    const wrapperDashboard = wrapperApp.find("Dashboard").get(0);

                    // Then
                    chai.expect(wrapperDashboard.props.score).to.equal("someScore");
                }));

                it("should pass areButtonsDisabled to Dashboard", sinon.test(function () {
                    // Given
                    this.stub(Game.prototype, "isInputDisabled").returns(false);

                    // When
                    const wrapperApp = shallow(<SimonGameApp/>);
                    const wrapperButtonsPanel = wrapperApp.find("ButtonsPanel").get(0);

                    // Then
                    chai.expect(wrapperButtonsPanel.props.areButtonsDisabled).to.equal(false);
                }));

                describe("<Container/>", function () {
                    it("should be a container which has a div.Container which hold the props.children", function () {
                        //    Given
                        let aChild = shallow(<img/>);

                        //    When
                        const wrapperContainer = shallow(<Container>{aChild}</Container>);
                        const divUnderContainer = wrapperContainer.find('div').get(0);

                        //    Then
                        chai.expect(divUnderContainer.props.children).to.equal(aChild);
                    });
                });

                describe("<Title/>", function () {
                    it("should contain <div>{title}</div>", function () {
                        //    Given
                        const wrapperTitle = shallow(<Title/>);

                        //    When
                        const divTitle = wrapperTitle.find("div").get(0);

                        //    Then
                        chai.expect(divTitle.props.children).to.equal("Simon® Game")
                    });
                });

                describe("<Dashboard/>", function () {
                    it("should contain <Score/>, <StrictSwitch/>, <StartButton/>", function () {
                        //    Given
                        const wrapperDashboard = shallow(<Dashboard/>);
                        //    When
                        //    Then
                        const containers = wrapperDashboard.find('Container');
                        chai.expect(containers).to.have.length(3);

                        [
                            [<Score/>, "<Score/>"],
                            [<StrictSwitch/>, "<StrictSwitch/>"],
                            [<StartButton/>, "<StartButton/>"]
                        ].forEach((element, i) => {
                            let container = shallow(containers.get(i));
                            chai.expect(container.containsMatchingElement(element[0]))
                                .to.equal(true, format("<Dashboard/> should contain {}", element[1]));
                        });
                    });

                    it("should pass handleRestart callback to updateState at <StartButton/>", function () {
                        //    Given
                        let mockHandleRestartTriggered = false;
                        const mockHandleRestart = () => {
                            mockHandleRestartTriggered = true
                        };

                        const wrapperDashboard = shallow(<Dashboard onUpdateStateFromRestart={mockHandleRestart}/>);
                        const wrapperStartButton = wrapperDashboard.find("StartButton").get(0);

                        //    When
                        wrapperStartButton.props.updateState();

                        //    Then
                        chai.expect(mockHandleRestartTriggered).to.be.true;
                    });

                    it("should pass score to score at <Score/>", function () {
                        //    Given
                        //    When
                        const wrapperDashboard = shallow(<Dashboard score="someScore"/>);
                        const wrapperStartButton = wrapperDashboard.find("Score").get(0);

                        //    Then
                        chai.expect(wrapperStartButton.props.score).to.equal("someScore");
                    });


                    describe("<Score/>", function () {
                        it("should display this.props.score", sinon.test(function () {
                            //    Given
                            //    When
                            const wrapperScore = shallow(<Score score="someScore"/>);
                            const divScore = wrapperScore.find("div").get(0);

                            //    Then
                            chai.expect(divScore.props.children).to.equal("someScore")
                        }));
                    });

                    describe("<StrictSwitch/>", function () {
                        it("should have a checkbox (unselected by default)", function () {
                            //    Given
                            //    When
                            const wrapperStrictSwitch = shallow(<StrictSwitch/>);
                            const inputCheckbox = wrapperStrictSwitch.find("input").get(0);

                            //    Then
                            chai.expect("checked" in inputCheckbox.props).to.be.false;
                            chai.expect(inputCheckbox.props.type).to.equal("checkbox");
                        });
                    });

                    describe("<StartButton/>", function () {
                        it("should have a button for restarting, i.e. calling game.restart() when clicked and cause state update", sinon.test(function () {
                            //    Given
                            const mockGame_notifiyStatus = this.mock(Game.prototype);
                            let notifyStatusRestartTriggered = false;
                            mockGame_notifiyStatus.expects("notifyStatus").once().returns({
                                restart(){
                                    notifyStatusRestartTriggered = true;
                                }
                            });

                            let mockClickCallbackTriggered = false;
                            const mockClickCallback = () => {
                                // ensure game.restart() is triggered first
                                mockGame_notifiyStatus.verify();
                                mockClickCallbackTriggered = true;
                            };

                            const wrapperStartButton = shallow(<StartButton updateState={mockClickCallback}/>);
                            const buttonRestart = shallow(wrapperStartButton.find("button").get(0));

                            //    When
                            buttonRestart.simulate('click');

                            //    Then
                            [
                                mockClickCallbackTriggered,
                                notifyStatusRestartTriggered
                            ].forEach((shouldBeTriggered) => {
                                chai.expect(shouldBeTriggered).to.be.true;
                            });
                        }));
                    });
                });

                describe("<ButtonsPanel/>", function () {
                    it("should have 4 <GameButton/> that have ['red', 'green', 'blue', 'yellow'] as this.props.colour and 'areButtonsDisabled' as this.props.isDisabled respectively", function () {
                        //    Given
                        const someDisabledValue = "someDisabledValue";
                        const wrapperButtonsPanel = shallow(<ButtonsPanel areButtonsDisabled={someDisabledValue}/>);

                        //    When
                        const containers = wrapperButtonsPanel.find("Container");

                        //    Then
                        chai.expect(containers).to.have.length(4);

                        [
                            'red',
                            'green',
                            'blue',
                            'yellow'
                        ].forEach((colour, i) => {
                            const container = shallow(containers.get(i));
                            chai.expect(container.containsMatchingElement(<GameButton/>))
                                .to.equal(true, format("colour: '{}' - <ButtonsPanel/> should contain <GameButton/>", colour));

                            const gameButton = container.find('GameButton');
                            chai.expect(gameButton.get(0).props.colour).to.equal(colour, format("colour should be '{}'", colour));
                            chai.expect(gameButton.get(0).props.isDisabled).to.equal(someDisabledValue, format("isDisabled should be '{}'", someDisabledValue));
                        });
                    });

                    describe("<GameButton/>", function () {
                        let assertAndGetButton = (wrapperGameButton) => {
                            let inputButton = wrapperGameButton.find("input").get(0);
                            chai.expect(inputButton.props.type).to.equal("button");
                            return inputButton;
                        };

                        [
                            {"colour": "red", "mappedValue": "btn-danger"},
                            {"colour": "green", "mappedValue": "btn-success"},
                            {"colour": "blue", "mappedValue": "btn-primary"},
                            {"colour": "yellow", "mappedValue": "btn-warning"},
                            {"colour": "not-existing-colour", "mappedValue": "btn-default"}
                        ].forEach((param) => {
                            it(format("should contain <input type='button'/> with className as a value ({}) mapped from this.props.colour ({})", param.mappedValue, param.colour), function () {
                                //    Given
                                //    When
                                const wrapperGameButton = shallow(<GameButton colour={param.colour}/>);

                                //    Then
                                const inputButton = assertAndGetButton(wrapperGameButton);
                                chai.expect(inputButton.props.className).to.contains(param.mappedValue);
                            });
                        });

                        it("should still render mappedValue as 'btn-default' if colour is omitted", function () {
                            //    Given
                            //    When
                            const wrapperGameButton = shallow(<GameButton/>);

                            //    Then
                            const inputButton = assertAndGetButton(wrapperGameButton);
                            chai.expect(inputButton.props.className).to.contains("btn-default");
                        });

                        [
                            true,
                            false
                        ].forEach((isDisabled) => {
                            it(format("should use this.props.isDisabled(={}) as the value of 'disabled' attribute", isDisabled.toString()), function () {
                                //    Given
                                //    When
                                const wrapperGameButton = shallow(<GameButton isDisabled={isDisabled}/>);

                                //    Then
                                assertAndGetButton(wrapperGameButton);
                                chai.expect(wrapperGameButton.find('input').html().includes('disabled=""')).to.equal(isDisabled);
                            });
                        });

                        it("should still render disabled as 'false' if isDisabled is omitted", function () {
                            //    Given
                            //    When
                            const wrapperGameButton = shallow(<GameButton/>);

                            //    Then
                            assertAndGetButton(wrapperGameButton);
                            chai.expect(wrapperGameButton.find('input').html().includes('disabled=""')).to.equal(false);
                        });
                    });
                });
            });
        });
    });
});
