/**
 * # Game settings definition file
 * Copyright(c) 2015 author <email>
 * MIT Licensed
 *
 * The variables in this file will be sent to each client and saved under:
 *
 *   `node.game.settings`
 *
 * The name of the chosen treatment will be added as:
 *
 *    `node.game.settings.treatmentName`
 *
 * http://www.nodegame.org
 * ---
 */
module.exports = {

    // Variables shared by all treatments.

    // Session counter.
    SESSION_ID: 1,

    // Numnber of game rounds repetitions.
    REPEAT: 4,

    // Treatments definition.

    // They can contain any number of properties, and also overwrite
    // those defined above.

    // If the `treatments` object is missing a treatment named _standard_
    // will be created automatically, and will contain all variables.

    treatments: {

        standard: {
            fullName: "Standard Treatment",
            description: "Longer time",
            timer: 30000
        },

        pressure: {
            fullName: "Time Pressure Treatment",
            description: "Short times to take decisions",
            timer: 10000
        },

    }
};
