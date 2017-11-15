const metroBundler = require('metro-bundler');

module.exports = {
    getBlacklistRE: function() {
        return metroBundler.createBlacklist([/build_a_simon_game\/.*/]);
    }
};