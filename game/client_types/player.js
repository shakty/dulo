/**
 * # Player type implementation of the game stages
 * Copyright(c) 2015 author <email>
 * MIT Licensed
 *
 * Each client type must extend / implement the stages defined in `game.stages`.
 * Upon connection each client is assigned a client type and it is automatically
 * setup with it.
 *
 * http://www.nodegame.org
 * ---
 */

"use strict";

var ngc = require('nodegame-client');
var stepRules = ngc.stepRules;
var constants = ngc.constants;
var publishLevels = constants.publishLevels;

module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

    var game;

    stager.setOnInit(function() {

        // Initialize the client.

        var header, frame;

        // Bid is valid if it is a number between 0 and 100.
        this.isValidBid = function(n) {
            if (typeof n !== 'string') return false;
            if (!/^\d+$/.test(n)) return false;
            n = parseInt(n, 10);
            if (n < 0 || n > 100) return false;
            return n;
        };

        this.randomOffer = function(offer, submitOffer) {
            var n;
            n = JSUS.randomInt(-1,100);
            offer.value = n;
            submitOffer.click();
        };

        // Setup page: header + frame.
        header = W.generateHeader();
        frame = W.generateFrame();

        // Add widgets.
        this.visualRound = node.widgets.append('VisualRound', header);
        this.timer = node.widgets.append('VisualTimer', header);
    });

    stager.extendStep('instructions', {
        cb: function() {

            W.loadFrame('instructions.htm', function() {

                var button = W.getElementById('read');
                button.onclick = function() {
                    node.done();
                };

            });
        },
        timer: 60000
    });

    stager.extendStep('game', {
        cb: function() {
            W.loadFrame('game.htm', function() {

                node.on.data('ROLE_DICTATOR', function(msg) {
                    var button, offer, div;

                    // Make the dictator display visible.
                    div = W.getElementById('dictator').style.display = '';
                    button = W.getElementById('submitOffer');
                    offer =  W.getElementById('offer');


                    // Setup the timer.
                    node.game.timer.init({
                        milliseconds: node.game.settings.timer,
                        timeup: function() {
                            node.game.randomOffer(offer, button);
                        }
                    });
                    node.game.timer.updateDisplay();
                    node.game.timer.startTiming();

                    // Listen on click event.
                    button.onclick = function() {
                        var to, decision;
                        // Validate offer.
                        decision = node.game.isValidBid(offer.value);
                        if ('number' !== typeof decision) {
                            W.writeln('Please enter a number between ' +
                                      '0 and 100.');
                            return;
                        }
                        button.disabled = true;

                        // The recipient of the offer.
                        to = msg.data;

                        // Send the decision to the other player.
                        node.say('decision', to, decision);

                        // Mark the end of the round, and
                        // store the decision in the server.
                        node.done({ offer: decision });
                    };
                });

                node.on.data('ROLE_OBSERVER', function(msg) {
                    var button, span, offer, div;

                    node.game.timer.clear();
                    node.game.timer.startWaiting({
                        milliseconds: node.game.settings.timer,
                        timeup: false
                    });

                    // Make the observer display visible.
                    div = W.getElementById('observer').style.display = '';
                    span = W.getElementById('dots');
                    W.addLoadingDots(span);
                    node.on.data('decision', function(msg) {
                        var span;
                        span = W.getElementById('decision');
                        span.innerHTML = 'The dictator offered: ' + msg.data +
                            ' ECU.';
                        // Setting the step done with delay.
                        setTimeout(function() {
                            node.done();
                        }, 5000);
                    });
                });

            });
        }
    });

    stager.extendStep('end', {
        // frame: 'end.htm',
        cb: function() {
            W.loadFrame('end.htm');
            node.game.timer.startTiming();
            node.game.timer.setToZero();
        }
    });

    game = setup;
    game.plot = stager.getState();
    return game;
};
