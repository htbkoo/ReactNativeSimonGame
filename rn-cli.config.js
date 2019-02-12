const metroBundler = require('metro');

module.exports = {
    getBlacklistRE: function() {
        return metroBundler.createBlacklist([/build_a_simon_game\/.*/]);
    }
};