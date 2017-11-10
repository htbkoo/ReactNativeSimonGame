const css = require("css");
const fs = require('fs');
const path = require('path');

describe("css spike", function () {
    it("load css", function () {
        let filePath = path.normalize(`${__dirname}/../build_a_simon_game/src/App.css`);
        let file = fs.readFileSync(filePath);

        css.parse(file.toString(), {source: filePath});
    });
});