/**
 *
 * @description packages the parking_lot inside bin/ folder for the host platform (macOS/Linux/Windows).
 * It uses `pkg` npm module to package the Node.js application.
 * Learn more: https://www.npmjs.com/package/pkg
 *
 */
const sh = require('shelljs'),
  fs = require('fs'),
  pkg = require('../package.json'),
  host = require('./utils/findHost')();

console.log('Packaging the Parking Lot Console Application for host platform...\n');

sh.exec('pkg ./index.js -t host --out-path bin', (code, stderr, stdout) => {
    if (code !== 0 && stderr) {
        console.log('Error occurred while packaging Parking Lot');
        return 0;
    }
    else {
        // renaming it as per assignment instructions
        fs.rename('./bin/index', './bin/parking_lot', function (err) {
            if (err) {
                console.log('Error occurred while renaming the executable');
            }
            else {
                console.log('Parking Lot (version : ' + pkg.version + ') is created successfully for ' + host + ' in "bin/" folder\n');
            }
        });
    }
});
