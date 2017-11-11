/**
 * Created by Hey on 15 May 2017
 */

import chai from "chai";

import StatusManager from "./statusManager";
import STATUS_ENUM from "./StatusesEnum";

let isIdle = STATUS_ENUM.isIdle,
    isStarting = STATUS_ENUM.isStarting,
    isDemoing = STATUS_ENUM.isDemoing,
    isPlaying = STATUS_ENUM.isPlaying,
    isVictory = STATUS_ENUM.isVictory;

describe("SimonGame (StatusManager) - FreeCodeCamp", function () {
    "use strict";
    describe("FrontEnd - Advanced Project", function () {
        describe("SimonGame (StatusManager)", function () {
            describe("Initialization", function () {
                it("should getStatus as STATUS_ENUM.isIdle when initialized", function () {
                    //    Given
                    //    When
                    let statusManager = new StatusManager();

                    //    Then
                    assertStatusChange(statusManager).from(isIdle);
                });
            });

            describe("setStatus(isIdle)", function () {
                it("should return false when setStatus(isIdle)", function () {
                    //    Given
                    //    When
                    let statusManager = new StatusManager();

                    //    Then
                    assertStatusChange(statusManager).from(isIdle)
                        .after(() => {
                            chai.expect(statusManager.setStatus(isIdle)).to.equal(false);
                        })
                        .to(isIdle);
                });
            });

            describe("setStatus(isStarting)", function () {
                it("should return true by setStatus(isStarting) when status isIdle", function () {
                    //    Given
                    //    When
                    let statusManager = new StatusManager();

                    //    Then
                    assertStatusChange(statusManager).from(isIdle)
                        .after(() => {
                            chai.expect(statusManager.setStatus(isStarting)).to.equal(true);
                        })
                        .to(isStarting);
                });
                it("should return false by setStatus(isStarting) when status isStarting already", function () {
                    //    Given
                    //    When
                    let statusManager = new StatusManager();

                    //    Then
                    setStatusFromIdleToStarting(statusManager)
                        .thenAfter(() => {
                            chai.expect(statusManager.setStatus(isStarting)).to.equal(false);
                        })
                        .to(isStarting);
                });
                it("should return true by setStatus(isStarting) when status isDemoing", function () {
                    //    Given
                    //    When
                    let statusManager = new StatusManager();

                    //    Then
                    setStatusFromIdleToDemoing(statusManager)
                        .thenAfter(() => {
                            chai.expect(statusManager.setStatus(isStarting)).to.equal(true);
                        })
                        .to(isStarting);
                });
                it("should return true by setStatus(isStarting) when status isPlaying", function () {
                    //    Given
                    //    When
                    let statusManager = new StatusManager();

                    //    Then
                    setStatusFromIdleToPlaying(statusManager)
                        .thenAfter(() => {
                            chai.expect(statusManager.setStatus(isStarting)).to.equal(true);
                        })
                        .to(isStarting);
                });
                it("should return true by setStatus(isStarting) when status isVictory", function () {
                    //    Given
                    //    When
                    let statusManager = new StatusManager();

                    //    Then
                    setStatusFromIdleToPlaying(statusManager)
                        .thenAfter(() => {
                            chai.expect(statusManager.setStatus(isVictory)).to.equal(true);
                            chai.expect(statusManager.setStatus(isStarting)).to.equal(true);
                        })
                        .to(isStarting);
                });
            });

            describe("setStatus(isDemoing)", function () {
                it("should return true from setStatus(isDemoing) when status isStarting", function () {
                    //    Given
                    //    When
                    let statusManager = new StatusManager();

                    //    Then
                    setStatusFromIdleToStarting(statusManager)
                        .thenAfter(() => {
                            chai.expect(statusManager.setStatus(isDemoing)).to.equal(true);
                        })
                        .to(isDemoing);
                });

                it("should return true from setStatus(isDemoing) when status isPlaying", function () {
                    //    Given
                    //    When
                    let statusManager = new StatusManager();

                    //    Then
                    setStatusFromIdleToPlaying(statusManager)
                        .thenAfter(() => {
                            chai.expect(statusManager.setStatus(isDemoing)).to.equal(true);
                        })
                        .to(isDemoing);
                });
            });

            describe("setStatus(isPlaying)", function () {
                it("should return true from setStatus(isPlaying) when status isDemoing", function () {
                    //    Given
                    //    When
                    let statusManager = new StatusManager();

                    //    Then
                    setStatusFromIdleToDemoing(statusManager)
                        .thenAfter(() => {
                            chai.expect(statusManager.setStatus(isPlaying)).to.equal(true);
                        })
                        .to(isPlaying);
                });

                it("should return true from setStatus(isPlaying) between status isPlaying and isDemoing", function () {
                    //    Given
                    //    When
                    let statusManager = new StatusManager();

                    //    Then
                    setStatusFromIdleToPlaying(statusManager)
                        .thenAfter(() => {
                            chai.expect(statusManager.setStatus(isDemoing)).to.equal(true);
                            chai.expect(statusManager.setStatus(isPlaying)).to.equal(true);
                        })
                        .to(isPlaying);
                });
            });

            describe("setStatus(isVictory)", function () {
                it("should return true from setStatus(isVictory) when status isPlaying", function () {
                    //    Given
                    //    When
                    let statusManager = new StatusManager();

                    //    Then
                    setStatusFromIdleToPlaying(statusManager)
                        .thenAfter(() => {
                            chai.expect(statusManager.setStatus(isVictory)).to.equal(true);
                        })
                        .to(isVictory);
                });
            });

            function assertStatusChange(statusManager) {
                let assertStatus = (status) => {
                    chai.expect(statusManager.getStatus()).to.equal(status);
                };
                return {
                    from(fromStatus){
                        assertStatus(fromStatus);
                        return {
                            after(action){
                                action();
                                return {
                                    to(toStatus){
                                        assertStatus(toStatus);
                                        return {
                                            thenFrom(anotherFromStatus){
                                                return assertStatusChange(statusManager).from(anotherFromStatus);
                                            },
                                            thenAfter(anotherAction){
                                                return assertStatusChange(statusManager).from(toStatus).after(anotherAction);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            function setStatusFromIdleToStarting(statusManager) {
                return assertStatusChange(statusManager).from(isIdle)
                    .after(() => {
                        chai.expect(statusManager.setStatus(isStarting)).to.equal(true);
                    })
                    .to(isStarting);
            }

            function setStatusFromIdleToDemoing(statusManager) {
                return setStatusFromIdleToStarting(statusManager)
                    .thenAfter(() => {
                        chai.expect(statusManager.setStatus(isDemoing)).to.equal(true);
                    })
                    .to(isDemoing);
            }

            function setStatusFromIdleToPlaying(statusManager) {
                return setStatusFromIdleToDemoing(statusManager)
                    .thenAfter(() => {
                        chai.expect(statusManager.setStatus(isPlaying)).to.equal(true);
                    })
                    .to(isPlaying);
            }
        });
    });
});