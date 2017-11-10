const fs = require('fs');
const path = require('path');

module.exports = {
    load: {
        fromPathAsString(params) {
            return fs.readFileSync(getPathFromParams(params)).toString();
        }
    },
    promiseLoad: {
        fromPathAsString(params) {
            return new Promise((resolve, reject) => {
                fs.readFile(getPathFromParams(params), (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    return resolve(data.toString());
                });
            });
        }
    }
};

function getPathFromParams(params) {
    return path.normalize(`${params.root}/${params.relativePath}`);
}