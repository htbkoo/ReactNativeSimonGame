const fs = require('fs');
const path = require('path');

module.exports = {
    load: {
        fromPathAsString(params) {
            return fs.readFileSync(path.normalize(`${params.root}/${params.relativePath}`)).toString();
        }
    }
};