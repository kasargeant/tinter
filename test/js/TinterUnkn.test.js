/**
 * @file TinterUnkn.test.js
 * @description Unit tests for the Tinter Class (Node/Unknown environ).
 * @author Kyle Alexis Sargeant <kasargeant@gmail.com> {@link https://github.com/kasargeant https://github.com/kasargeant}.
 * @copyright Kyle Alexis Sargeant 2017
 * @license See LICENSE.txt file included in this distribution.
 */

"use strict";

// Imports (unmocked)
const Tinter = require("../../src/js/Tinter");


// Constants
const DUMMY_STRING = "Dummy String";

describe("Class: Tinter (Node/unknown environ)", function() {

    describe("Standard sanity check", function() {
        it("contains spec with an positive expectation", function() {
            expect(true).toBe(true);
        });
        it("contains spec with a negative expectation", function() {
            expect(!true).toBe(false);
        });
    });

    describe("Environment detection", function() {

        it("should recognise a generic 16-col env e.g. GIT windows console", function() {
            expect(Tinter._setEnv({
                TERM: "xterm"
            })).toMatchObject({
                scheme: "16",
                isBrowser: false,
                debug: false
            });
        });
        it("should recognise a generic 256-col env e.g. GIT windows console", function() {
            expect(Tinter._setEnv({
                TERM: "xterm-256color"
            })).toMatchObject({
                scheme: "256",
                isBrowser: false,
                debug: false
            });
        });

        // it("should recognise a generic Truecolor env e.g. ????", function() {
        //     expect(Tinter._setEnv({
        //         TERM: "xterm"
        //     })).toMatchObject({
        //         scheme: "16",
        //         isBrowser: false,
        //         debug: false
        //     });
        // });

        it("should recognise the scheme for a 16-col env e.g. WebStorm Run window", function() {
            expect(Tinter._setEnv({
                TERM: "xterm-256color",
                FORCE_COLOR: "true"
            })).toMatchObject({
                scheme: "16",
                isBrowser: false,
                debug: false
            });
        });

        it("should recognise the scheme for a 16-col env e.g. WebStorm Run window", function() {
            expect(Tinter._setEnv({
                TERM: "xterm-256color",
                FORCE_COLOR: "false"
            })).toMatchObject({
                scheme: "256",
                isBrowser: false,
                debug: false
            });
        });

        it("should recognise the specific 16M-col env of Apple's Terminal", function() {
            expect(Tinter._setEnv({
                TERM: "xterm-256color",
                TERM_PROGRAM: "Apple_Terminal"
            })).toMatchObject({
                scheme: "16M",
                isBrowser: false,
                debug: false
            });
        });

        it("should recognise the specific 16M-col env of the iTerm application", function() {
            expect(Tinter._setEnv({
                TERM: "xterm-256color",
                TERM_PROGRAM: "iTerm.app"
            })).toMatchObject({
                scheme: "16M",
                isBrowser: false,
                debug: false
            });
        });

    });


});

