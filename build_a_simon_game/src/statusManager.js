/**
 * Created by Hey on 25 Apr 2017
 */

const STATUS_ENUM = require("./StatusesEnum").default;

const statuses = new WeakMap();

const VALID_TO_STATUS = {
    [STATUS_ENUM.isIdle]: [STATUS_ENUM.isStarting],
    [STATUS_ENUM.isStarting]: [STATUS_ENUM.isDemoing],
    [STATUS_ENUM.isDemoing]: [STATUS_ENUM.isPlaying, STATUS_ENUM.isStarting],
    [STATUS_ENUM.isPlaying]: [STATUS_ENUM.isDemoing, STATUS_ENUM.isVictory, STATUS_ENUM.isStarting],
    [STATUS_ENUM.isVictory]: [STATUS_ENUM.isStarting],
};

const isTargetStatusValid = (from, to) => ((from in VALID_TO_STATUS) && (VALID_TO_STATUS[from].indexOf(to) !== -1));

export default class StatusManager {
    constructor() {
        statuses.set(this, STATUS_ENUM.isIdle);
    }

    getStatus() {
        return statuses.get(this);
    }

    setStatus(toStatus) {
        if (isTargetStatusValid(this.getStatus(), toStatus)) {
            statuses.set(this, toStatus);
            return true;
        }
        return false;
    }
}