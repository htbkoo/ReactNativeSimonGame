/**
 * Created by Hey on 17 May 2017
 */

const COLOUR_ENUM = {
    "RED": Symbol("RED"),
    "GREEN": Symbol("GREEN"),
    "BLUE": Symbol("BLUE"),
    "YELLOW": Symbol("YELLOW"),
};
Object.freeze(COLOUR_ENUM);

export default COLOUR_ENUM;
export let colourEnumToString = (colourEnum) => {
    const match = Object.keys(COLOUR_ENUM).filter(key => colourEnum === COLOUR_ENUM[key]);
    if (match.length === 1) {
        return match[0];
    }
};