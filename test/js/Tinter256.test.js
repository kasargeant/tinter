/**
 * @file Tinter16.test.js
 * @description Unit tests for the Tinter Class (Node/256-color [using CSS Named colors]).
 * @author Kyle Alexis Sargeant <kasargeant@gmail.com> {@link https://github.com/kasargeant https://github.com/kasargeant}.
 * @copyright Kyle Alexis Sargeant 2017
 * @license See LICENSE.txt file included in this distribution.
 */

"use strict";

// Imports (unmocked)
process.env.TINTER_TEST = "256";
const Tinter = require("../../src/js/Tinter");

// Constants
const DUMMY_STRING = "Dummy String";

describe("Class: Tinter (Node/256-color [using CSS Named colors])", function() {

    describe("Standard sanity check", function() {
        it("contains spec with an positive expectation", function() {
            expect(true).toBe(true);
        });
        it("contains spec with a negative expectation", function() {
            expect(!true).toBe(false);
        });
    });

    describe("Colorization functions", function() {

        it("should be able mark a string as bright", function() {
            expect(Tinter.bright(DUMMY_STRING)).toBe(`[1m${DUMMY_STRING}[0m`);
        });

        it("should be able mark a string as dim", function() {
            expect(Tinter.dim(DUMMY_STRING)).toBe(`[2m${DUMMY_STRING}[0m`);
        });

        it("should be able mark a string as italic", function() {
            expect(Tinter.italic(DUMMY_STRING)).toBe(`[3m${DUMMY_STRING}[0m`);
        });

        it("should be able mark a string as underscored", function() {
            expect(Tinter.underline(DUMMY_STRING)).toBe(`[4m${DUMMY_STRING}[0m`);
        });

        it("should be able mark a string as blinking", function() {
            expect(Tinter.blink(DUMMY_STRING)).toBe(`[5m${DUMMY_STRING}[0m`);
        });

        it("should be able mark a string as inversed", function() {
            expect(Tinter.inverse(DUMMY_STRING)).toBe(`[7m${DUMMY_STRING}[0m`);
        });

        it("should be able mark a string as hidden", function() {
            expect(Tinter.hidden(DUMMY_STRING)).toBe(`[8m${DUMMY_STRING}[0m`);
        });

        it("should be able mark a string as black", function() {
            expect(Tinter.black(DUMMY_STRING)).toBe(`[38;5;0m${DUMMY_STRING}[0m`);
        });

        it("should be able mark a string as red", function() {
            expect(Tinter.red(DUMMY_STRING)).toBe(`[38;5;160m${DUMMY_STRING}[0m`);
        });

        it("should be able mark a string as green", function() {
            expect(Tinter.green(DUMMY_STRING)).toBe(`[38;5;2m${DUMMY_STRING}[0m`);
        });

        it("should be able mark a string as yellow", function() {
            expect(Tinter.yellow(DUMMY_STRING)).toBe(`[38;5;190m${DUMMY_STRING}[0m`);
        });

        it("should be able mark a string as blue", function() {
            expect(Tinter.blue(DUMMY_STRING)).toBe(`[38;5;21m${DUMMY_STRING}[0m`);
        });

        it("should be able mark a string as magenta", function() {
            expect(Tinter.magenta(DUMMY_STRING)).toBe(`[38;5;165m${DUMMY_STRING}[0m`);
        });

        it("should be able mark a string as cyan", function() {
            expect(Tinter.cyan(DUMMY_STRING)).toBe(`[38;5;50m${DUMMY_STRING}[0m`);
        });

        it("should be able mark a string as white", function() {
            // console.log("IDX: " + Tinter.webColors.indexOf("white"));
            expect(Tinter.white(DUMMY_STRING)).toBe(`[38;5;231m${DUMMY_STRING}[0m`);
        });


        it("should be able mark a string with a black background", function() {
            expect(Tinter.blackBg(DUMMY_STRING)).toBe(`[48;5;0m${DUMMY_STRING}[0m`);
        });

        it("should be able mark a string with a red background", function() {
            expect(Tinter.redBg(DUMMY_STRING)).toBe(`[48;5;160m${DUMMY_STRING}[0m`);
        });

        it("should be able mark a string with a green background", function() {
            expect(Tinter.greenBg(DUMMY_STRING)).toBe(`[48;5;2m${DUMMY_STRING}[0m`);
        });

        it("should be able mark a string with a yellow background", function() {
            expect(Tinter.yellowBg(DUMMY_STRING)).toBe(`[48;5;190m${DUMMY_STRING}[0m`);
        });

        it("should be able mark a string with a blue background", function() {
            expect(Tinter.blueBg(DUMMY_STRING)).toBe(`[48;5;21m${DUMMY_STRING}[0m`);
        });

        it("should be able mark a string with a magenta background", function() {
            expect(Tinter.magentaBg(DUMMY_STRING)).toBe(`[48;5;165m${DUMMY_STRING}[0m`);
        });

        it("should be able mark a string with a cyan background", function() {
            expect(Tinter.cyanBg(DUMMY_STRING)).toBe(`[48;5;50m${DUMMY_STRING}[0m`);
        });

        it("should be able mark a string with a white background", function() {
            // console.log("IDX: " + Tinter.webColors.indexOf("whiteBg"));
            expect(Tinter.whiteBg(DUMMY_STRING)).toBe(`[48;5;231m${DUMMY_STRING}[0m`);
        });

        it("should degrade a truecolor to 256-color appropriately.", function() {
            expect(Tinter.style(DUMMY_STRING, [255,255,127], [192, 0, 55], "underline")).toBe(`\x1b[4m\x1b[48;5;160m\x1b[38;5;190m${DUMMY_STRING}\x1b[0m`);
        });
    });

});

