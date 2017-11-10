const chai = require('chai');

const fileLoader = require("../fileLoader");

describe("fileLoader", function () {
    describe("load", function () {
        describe("fromPathAsString", function () {
            it("should load file from root + relative path", function () {
                // given
                let expectedTest = "someText";

                // when
                let actualText = fileLoader.load.fromPathAsString({
                    root: __dirname,
                    relativePath: `../resources/someFile.txt`
                });

                // then
                chai.expect(actualText).to.equal(expectedTest);
            });
        });
    });
});