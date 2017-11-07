/**
 * Created by Hey on 29 May 2017
 */
import chai from "chai";
import format from "string-format";

import COLOUR_ENUM, {colourEnumToString}  from "./ColoursEnum";

describe("ColoursEnum", function () {
    describe("colourEnumToString", function () {
        [
            {
                "colourEnum": COLOUR_ENUM.RED,
                "colourString": "RED"
            },
            {
                "colourEnum": COLOUR_ENUM.GREEN,
                "colourString": "GREEN"
            },
            {
                "colourEnum": COLOUR_ENUM.BLUE,
                "colourString": "BLUE"
            },
            {
                "colourEnum": COLOUR_ENUM.YELLOW,
                "colourString": "YELLOW"
            },
        ].forEach(testCase => {
            it(format("should get colour(={}) as string(={})", testCase.colourEnum.toString(), testCase.colourString), function () {
                chai.expect(colourEnumToString(testCase.colourEnum)).to.equal(testCase.colourString);
            });
        });
    });
});