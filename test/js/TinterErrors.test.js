/**
 * @file TinterErrors.test.js
 * @description Unit tests for the Tinter Class errors.
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

    describe("_nearest16() errors", function() {

        // Bad types
        it("should throw an error with a style of the wrong type", function() {
            // expect(function() {Tinter._styleTruecolor("anything", [255,255,127], [192, 0, 55], "REALLYWRONG")}).toThrowError(new Error(`Unrecognised text style: 'REALLYWRONG'.`));
            expect(function() {
                // Tinter._nearest16([255, 255, 127]);
                Tinter._nearest16(255, 255, 127);
            }).toThrow();
        });
    });

    describe("_styleTruecolor() errors", function() {

        // Bad types
        it("should throw an error with a style of the wrong type", function() {
            // expect(function() {Tinter._styleTruecolor("anything", [255,255,127], [192, 0, 55], "REALLYWRONG")}).toThrowError(new Error(`Unrecognised text style: 'REALLYWRONG'.`));
            expect(function() {
                Tinter._styleTruecolor("anything", [255, 255, 127], [192, 0, 55], "REALLYWRONG");
            }).toThrow();
        });

        it("should throw an error with a background color of the wrong type", function() {
            expect(function() {
                Tinter._styleTruecolor("anything", [255, 255, 127], "red", "underline");
            }).toThrow();
        });

        it("should throw an error with a foreground color of the wrong type", function() {
            expect(function() {
                Tinter._styleTruecolor("anything", "green", [192, 0, 55], "underline");
            }).toThrow();
        });

        // Malformed arrays
        it("should throw an error with a malformed background color array", function() {
            expect(function() {
                Tinter._styleTruecolor("anything", [255, 255, 127], [192, 0], "underline");
            }).toThrow();
        });

        it("should throw an error with a malformed foreground color array", function() {
            expect(function() {
                Tinter._styleTruecolor("anything", [255, 127], [192, 0, 55], "underline");
            }).toThrow();
        });
    });

    describe("rgb() errors", function() {

        // it("should throw an error with a malformed style", function() {
        //     expect(function() {Tinter.rgb("anything", [255,255,255], [0,0,0], style="reset");}).toThrow();
        // });
        // Bad types
        it("should throw an error with a style of the wrong type", function() {
            // expect(function() {Tinter._styleTruecolor("anything", [255,255,127], [192, 0, 55], "REALLYWRONG")}).toThrowError(new Error(`Unrecognised text style: 'REALLYWRONG'.`));
            expect(function() {
                Tinter.rgb("anything", [255, 255, 127], [192, 0, 55], "REALLYWRONG");
            }).toThrow();
        });

        it("should throw an error with a background color of the wrong type", function() {
            expect(function() {
                Tinter.rgb("anything", [255, 255, 127], "red", "underline");
            }).toThrow();
        });

        it("should throw an error with a foreground color of the wrong type", function() {
            expect(function() {
                Tinter.rgb("anything", "green", [192, 0, 55], "underline");
            }).toThrow();
        });

        // Malformed arrays
        it("should throw an error with a malformed background color array", function() {
            expect(function() {
                Tinter.rgb("anything", [255, 255, 127], [192, 0], "underline");
            }).toThrow();
        });

        it("should throw an error with a malformed foreground color array", function() {
            expect(function() {
                Tinter.rgb("anything", [255, 127], [192, 0, 55], "underline");
            }).toThrow();
        });

    });

    //
    // describe("Building errors", function() {
    //
    //     it("should throw an error with a background color of the wrong type", function() {
    //
    //         process.env.TINTER_TEST = "NONEXISTANT";
    //         try {
    //             let newTinter = require("tinter");
    //         } catch(ex) {
    //             expect(ex).toBe(new Error(`Unknown color scheme 'NONEXISTANT'.`));
    //         }
    //
    //
    //     });
    //
    //
    // });
});

