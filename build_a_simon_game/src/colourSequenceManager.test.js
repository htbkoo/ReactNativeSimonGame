/**
 * Created by Hey on 28 May 2017
 */

import chai from "chai";
import sinon from "sinon";
import sinonTest from "sinon-test";
sinon.test = sinonTest.configureTest(sinon);
sinon.testCase = sinonTest.configureTestCase(sinon);

import COLOUR_ENUM from "./ColoursEnum";
import randomColourGenerator from "./randomColourGenerator";

import ColourSequenceManager from "./colourSequenceManager";

describe("SimonGame (ColourSequenceManager) - FreeCodeCamp", function () {
    "use strict";
    describe("FrontEnd - Advanced Project", function () {
        describe("SimonGame (ColourSequenceManager)", function () {
            describe("Initialization", function () {
                it("should get empty list for getSequence when initialized", function () {
                    //    Given
                    let colourSequenceManager = new ColourSequenceManager();

                    //    When
                    const sequence = colourSequenceManager.getSequence();

                    //    Then
                    chai.expect(sequence).to.be.an('array');
                    chai.expect(sequence).to.have.length(0);
                });
            });

            describe("getSequqnce", function () {
                it("should get a defensively copied clone of sequence from getSequence", function () {
                    //    Given
                    let colourSequenceManager = new ColourSequenceManager();

                    //    When
                    const sequence = colourSequenceManager.getSequence();
                    chai.expect(sequence).to.be.an('array');
                    chai.expect(sequence).to.have.length(0);

                    sequence.push("some broken data");

                    //    Then
                    const sequenceAgain = colourSequenceManager.getSequence();
                    chai.expect(sequenceAgain).to.be.an('array');
                    chai.expect(sequenceAgain).to.have.length(0, "getSequence() should return a copy of array that represent the internal sequence and modifying the copy should not changed internal data");

                });
            });

            describe("resetSequence", function () {
                it("should get list of 1 random colour for getSequence after resetSequence", sinon.test(function () {
                    //    Given
                    const randomColour = COLOUR_ENUM.RED;
                    this.stub(randomColourGenerator, "getNextColour").callsFake(() => randomColour);
                    let colourSequenceManager = new ColourSequenceManager();

                    //    When
                    colourSequenceManager.resetSequence();
                    const sequence = colourSequenceManager.getSequence();

                    //    Then
                    chai.expect(sequence).to.be.an('array');
                    chai.expect(sequence).to.have.length(1);
                    chai.expect(sequence[0]).to.equal(randomColour);
                }));
            });

            describe("addColour", function () {
                it("should add 1 random colour for getSequence after resetSequence", sinon.test(function () {
                    //    Given
                    const aRandomColour = COLOUR_ENUM.RED;
                    const anotherRandomColour = COLOUR_ENUM.BLUE;
                    this.stub(randomColourGenerator, "getNextColour")
                        .onFirstCall().returns(aRandomColour)
                        .onSecondCall().returns(anotherRandomColour);
                    let colourSequenceManager = new ColourSequenceManager();

                    //    When
                    colourSequenceManager.resetSequence();
                    colourSequenceManager.addColour();
                    const sequence = colourSequenceManager.getSequence();

                    //    Then
                    chai.expect(sequence).to.deep.equal([aRandomColour, anotherRandomColour]);
                }));
            });

            describe("check", function () {
                function createdColourSequenceManagerWithSteps(steps) {
                    let colourSequenceManager = new ColourSequenceManager();
                    ColourSequenceManager.__GetDependency__("sequences").set(colourSequenceManager, steps);
                    chai.expect(colourSequenceManager.getSequence()).to.deep.equal(steps);
                    return colourSequenceManager;
                }

                function assertStepAndExpectedCallbackBeingCalled(colourSequenceManager, stepAndCallbackName) {
                    let callbackCalled = false;
                    colourSequenceManager.check(stepAndCallbackName.step, {
                        [stepAndCallbackName.callbackName]: () => callbackCalled = true
                    });
                    chai.expect(callbackCalled).to.be.true;
                }

                it("should call callbacks.correctCallback() if input is correct and sequence is not completed", function () {
                    //    Given
                    let colourSequenceManager = createdColourSequenceManagerWithSteps([COLOUR_ENUM.RED, COLOUR_ENUM.YELLOW]);

                    //    When
                    //    Then
                    assertStepAndExpectedCallbackBeingCalled(colourSequenceManager, {
                        "callbackName": "correctCallback",
                        "step": COLOUR_ENUM.RED
                    });

                });

                it("should, for first step, call callbacks.scoreCallback() if input is correct and sequence is completed", function () {
                    //    Given
                    let colourSequenceManager = createdColourSequenceManagerWithSteps([COLOUR_ENUM.BLUE]);

                    //    When
                    //    Then
                    assertStepAndExpectedCallbackBeingCalled(colourSequenceManager, {
                        "callbackName": "scoreCallback",
                        "step": COLOUR_ENUM.BLUE
                    });
                });

                it("should, for more than 1 steps, call callbacks.correctCallback() if input is correct and sequence is not completed", function () {
                    //    Given
                    let colourSequenceManager = createdColourSequenceManagerWithSteps([COLOUR_ENUM.RED, COLOUR_ENUM.YELLOW]);

                    assertStepAndExpectedCallbackBeingCalled(colourSequenceManager, {
                        "callbackName": "correctCallback",
                        "step": COLOUR_ENUM.RED
                    });

                    //    When
                    //    Then
                    assertStepAndExpectedCallbackBeingCalled(colourSequenceManager, {
                        "callbackName": "scoreCallback",
                        "step": COLOUR_ENUM.YELLOW
                    });
                });

                it("should, for 1 step, call callbacks.wrongCallback() if input is wrong", function () {
                    //    Given
                    let colourSequenceManager = createdColourSequenceManagerWithSteps([COLOUR_ENUM.BLUE]);

                    //    When
                    //    Then
                    assertStepAndExpectedCallbackBeingCalled(colourSequenceManager, {
                        "callbackName": "wrongCallback",
                        "step": COLOUR_ENUM.YELLOW
                    });
                });

                it("should, for 2nd step, call callbacks.wrongCallback() if input is wrong, and would reset the step called", function () {
                    //    Given
                    let colourSequenceManager = createdColourSequenceManagerWithSteps([COLOUR_ENUM.BLUE, COLOUR_ENUM.GREEN]);
                    assertStepAndExpectedCallbackBeingCalled(colourSequenceManager, {
                        "callbackName": "correctCallback",
                        "step": COLOUR_ENUM.BLUE
                    });

                    //    When
                    //    Then
                    assertStepAndExpectedCallbackBeingCalled(colourSequenceManager, {
                        "callbackName": "wrongCallback",
                        "step": COLOUR_ENUM.BLUE
                    });

                    (function assertThatInputIndexShouldBeResetted() {
                        assertStepAndExpectedCallbackBeingCalled(colourSequenceManager, {
                            "callbackName": "wrongCallback",
                            "step": COLOUR_ENUM.GREEN
                        });
                    })();
                });

                it("should be possible to simulate a typical 2 and 3 steps case", function () {
                    //    Given
                    let colourSequenceManager = createdColourSequenceManagerWithSteps([COLOUR_ENUM.BLUE, COLOUR_ENUM.RED]);

                    //    When
                    assertStepAndExpectedCallbackBeingCalled(colourSequenceManager, {
                        "callbackName": "correctCallback",
                        "step": COLOUR_ENUM.BLUE
                    });
                    assertStepAndExpectedCallbackBeingCalled(colourSequenceManager, {
                        "callbackName": "scoreCallback",
                        "step": COLOUR_ENUM.RED
                    });
                    ColourSequenceManager.__GetDependency__("sequences").set(colourSequenceManager, [COLOUR_ENUM.BLUE, COLOUR_ENUM.RED, COLOUR_ENUM.GREEN]);

                    //    Then
                    assertStepAndExpectedCallbackBeingCalled(colourSequenceManager, {
                        "callbackName": "correctCallback",
                        "step": COLOUR_ENUM.BLUE
                    });
                    assertStepAndExpectedCallbackBeingCalled(colourSequenceManager, {
                        "callbackName": "correctCallback",
                        "step": COLOUR_ENUM.RED
                    });
                    assertStepAndExpectedCallbackBeingCalled(colourSequenceManager, {
                        "callbackName": "scoreCallback",
                        "step": COLOUR_ENUM.GREEN
                    });
                });

                it("should be possible to simulate a typical 5 steps case", function () {
                    //    Given
                    let colourSequenceManager = createdColourSequenceManagerWithSteps([COLOUR_ENUM.BLUE, COLOUR_ENUM.GREEN, COLOUR_ENUM.GREEN, COLOUR_ENUM.RED, COLOUR_ENUM.YELLOW]);
                    assertStepAndExpectedCallbackBeingCalled(colourSequenceManager, {
                        "callbackName": "correctCallback",
                        "step": COLOUR_ENUM.BLUE
                    });

                    //    When
                    //    Then
                    assertStepAndExpectedCallbackBeingCalled(colourSequenceManager, {
                        "callbackName": "wrongCallback",
                        "step": COLOUR_ENUM.BLUE
                    });

                    (function assertThatInputIndexShouldBeResetted() {
                        assertStepAndExpectedCallbackBeingCalled(colourSequenceManager, {
                            "callbackName": "wrongCallback",
                            "step": COLOUR_ENUM.GREEN
                        });
                    })();

                    (function assertCorrectTillScoreCase() {
                        [
                            COLOUR_ENUM.BLUE,
                            COLOUR_ENUM.GREEN,
                            COLOUR_ENUM.GREEN,
                            COLOUR_ENUM.RED
                        ].forEach((step) => {
                            assertStepAndExpectedCallbackBeingCalled(colourSequenceManager,
                                {
                                    "callbackName": "correctCallback",
                                    "step": step
                                });
                        });

                        assertStepAndExpectedCallbackBeingCalled(colourSequenceManager, {
                            "callbackName": "scoreCallback",
                            "step": COLOUR_ENUM.YELLOW
                        });
                    })();
                });
            });
        });
    });
});