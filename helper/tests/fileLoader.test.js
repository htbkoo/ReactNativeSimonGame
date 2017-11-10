const chai = require('chai');

const fileLoader = require("../fileLoader");

describe("fileLoader", function () {
    describe("load", function () {
        describe("fromPathAsString", function () {
            it("should load file from root + relative path and return string", function () {
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

    describe("promiseLoad", function () {
        describe("fromPathAsString", function () {
            it("should load file from root + relative path and return promise", function () {
                // given
                let expectedTest = "someText";

                // when
                let promise = fileLoader.promiseLoad.fromPathAsString({
                    root: __dirname,
                    relativePath: `../resources/someFile.txt`
                });

                // then
                return promise.then(actualText => chai.expect(actualText).to.equal(expectedTest));
            });
        });
    });
});