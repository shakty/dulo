/**
 * # Authorization codes
 * Copyright(c) {YEAR} {AUTHOR} <{AUTHOR_EMAIL}>
 * MIT Licensed
 *
 * Exports a function returning an array of client objects
 *
 * Client objects are used for authentication. They should be formatted
 * as follows:
 *
 *     {
 *        id:    '123XYZ', // The client id (must be unique).
 *        pwd:   'pwd',   // The authentication password (optional)
 *     }
 * 
 * Additional properties can be added and will be stored in the registry.
 *
 * Notice! For real authorization codes it use 32 random characters and digits.
 *
 * The array of codes  can be stored here directly or loaded
 * asynchronously from  another source, e.g a remote service or a database.
 *
 * http://www.nodegame.org
 * ---
 */

var path = require('path');

module.exports = function(settings, done) {
    var nCodes, i, codes;
    var dk, confPath;

    // Synchronous.

    if (settings.mode === 'auto') {

        nCodes = 100;
        codes = [];

        for (i = 0 ; i < nCodes; i ++) {
            codes.push({

                // Client id.
                id: i + '_access',                

                // Add a pwd field for extra security.
                // pwd: i + '_pwd',

                // Additional authentication properties often used in M-Turk.
                AccessCode: i + '_access',
                ExitCode: i + '_exit',

            });
        }
        return codes;
    }
    
    // Example: load codes asynchronously

    // loadCodesFromDatabase(function(err, codes) {
    //     done(err, codes);
    // });
};
