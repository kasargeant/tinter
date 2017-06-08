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

    describe("Errors", function() {

        // it("should recognise a generic 16-col env e.g. GIT windows console", function() {
        //     expect(Tinter.hi).toThrowError("");
        // });


    });


});

