const fs = require('fs');

exports.readInput = function (filename) {
    try {
        return fs.readFileSync(filename, 'utf8').split('\n')[0];
    } catch (err) {
        /* eslint-disable no-console */
        console.error(err);
    }
    return '';
};