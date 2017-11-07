/**
 * Created by Hey on 17 May 2017
 */

const STATUS_ENUM = {
    "isIdle": Symbol("isIdle"),
    "isStarting": Symbol("isStarting"),
    "isDemoing": Symbol("isDemoing"),
    "isPlaying": Symbol("isPlaying"),
    "isVictory": Symbol("isVictory")
};
Object.freeze(STATUS_ENUM);

export default STATUS_ENUM;