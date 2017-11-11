/**
 * Created by Hey on 15 May 2017
 */

import chai from "chai";

import scoreFormatter from "./scoreFormatter";

let testCases = {
    "scoreFormatter": [
        {
            "testName": "should format score as '--' if game is not started yet",
            "isIdle": true,
            "expectedScore": "--"
        },
        {
            "testName": "should format 0 raw score as '01'",
            "isIdle": false,
            "score": 0,
            "expectedScore": "01"
        },
        {
            "testName": "should format 1 raw score as '02'",
            "isIdle": false,
            "score": 1,
            "expectedScore": "02"
        },
        {
            "testName": "should format 9 raw score as '10'",
            "isIdle": false,
            "score": 9,
            "expectedScore": "10"
        },
        {
            "testName": "should format 19 raw score as '20'",
            "isIdle": false,
            "score": 19,
            "expectedScore": "20"
        },
        {
            "testName": "should format 20 raw score as 'WIN'",
            "isIdle": false,
            "isWon": true,
            "score": 20,
            "expectedScore": "WIN"
        }
    ]
};

describe("scoreFormatter", function () {
    testCases.scoreFormatter.forEach((testcase) => {
        it(testcase.testName, function () {
            //    Given
            //    When
            //    Then
            chai.expect(scoreFormatter.format(testcase.score, testcase.isIdle, testcase.isWon)).to.equal(testcase.expectedScore)
        });
    });
});