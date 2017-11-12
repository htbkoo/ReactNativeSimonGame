/**
 * Created by Hey on 25 Apr 2017
 */

const scoreFormatter = require("./scoreFormatter").default;
const STATUS_ENUM = require("./StatusesEnum").default;
const ColoursEnum = require("./ColoursEnum");
const COLOUR_ENUM = ColoursEnum.default;
const colourEnumToString = ColoursEnum.colourEnumToString;
const StatusManager = require("./statusManager").default;
const ColourSequenceManager = require("./colourSequenceManager").default;

const WIN_SCORE = 20;

let scores = new WeakMap();
let strictModes = new WeakMap();
let statusManagers = new WeakMap();
let colourSequenceManagers = new WeakMap();

let SIMPLE_NOTIFY_ACTIONS = {
    "started": STATUS_ENUM.isDemoing,
    "demoed": STATUS_ENUM.isPlaying,
    "won": STATUS_ENUM.isVictory
};

export default class Game {
    constructor() {
        scores.set(this, 0);
        strictModes.set(this, false);
        statusManagers.set(this, new StatusManager());
        colourSequenceManagers.set(this, new ColourSequenceManager());
    };

    getFormattedScore() {
        return scoreFormatter.format(scores.get(this), this.status().isIdle(), isVictory.call(this));
    }

    getSequenceAsLowerCaseStrings() {
        return colourSequenceManagers.get(this).getSequence().map(colour => colourEnumToString(colour).toLowerCase());
    }

    isStrictMode() {
        return strictModes.get(this);
    }

    toggleStrict() {
        strictModes.set(this, !this.isStrictMode());
    }

    isInputDisabled() {
        return !this.status().isPlaying();
    }

    isRestartDisabled() {
        return this.status().isDemoing();
    }

    buttons() {
        return Object.keys(COLOUR_ENUM)
            .reduce((prev, key) => {
                prev[key.toLowerCase()] = (callbacks) => {
                    colourSequenceManagers.get(this).check(COLOUR_ENUM[key], {
                        "correctCallback": callbacks.correctCallback,
                        "scoreCallback": () => {
                            incScore.call(this);
                            if (isVictory.call(this)) {
                                setStatusAndPropagateCallback.call(this, STATUS_ENUM.isVictory, callbacks.winCallback);
                            } else {
                                colourSequenceManagers.get(this).addColour();
                                setStatusAndPropagateCallback.call(this, STATUS_ENUM.isDemoing, callbacks.scoreCallback);
                            }
                        },
                        "wrongCallback": () => {
                            if (strictModes.get(this)) {
                                this.notifyStatus().restart();
                                callbacks.restartCallback();
                            } else {
                                setStatusAndPropagateCallback.call(this, STATUS_ENUM.isDemoing, callbacks.wrongCallback);
                            }
                        }
                    });
                };

                return prev;
            }, {});
    }

    notifyStatus() {
        const actions = Object.keys(SIMPLE_NOTIFY_ACTIONS)
            .reduce((prev, key) => {
                prev[key] = () => statusManagers.get(this).setStatus(SIMPLE_NOTIFY_ACTIONS[key]);
                return prev;
            }, {});
        actions.restart = () => {
            statusManagers.get(this).setStatus(STATUS_ENUM.isStarting);
            scores.set(this, 0);
            colourSequenceManagers.get(this).resetSequence();
        };
        return actions;
    }

    status() {
        return Object.keys(STATUS_ENUM).reduce((prev, key) => {
            prev[key] = () => (STATUS_ENUM[key] === statusManagers.get(this).getStatus());
            return prev;
        }, {});
    }
};

function incScore() {
    scores.set(this, scores.get(this) + 1);
}

function isVictory() {
    return scores.get(this) >= WIN_SCORE;
}

function setStatusAndPropagateCallback(status, callbackToCall) {
    statusManagers.get(this).setStatus(status);
    callbackToCall();
}