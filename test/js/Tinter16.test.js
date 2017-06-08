/**
 * @file Tinter16.test.js
 * @description Unit tests for the Tinter Class (Node/16-color ANSI).
 * @author Kyle Alexis Sargeant <kasargeant@gmail.com> {@link https://github.com/kasargeant https://github.com/kasargeant}.
 * @copyright Kyle Alexis Sargeant 2017
 * @license See LICENSE.txt file included in this distribution.
 */

"use strict";

// Imports (unmocked)
process.env.TINTER_TEST = "16";
const Tinter = require("../../src/js/Tinter");


// Constants
const DUMMY_STRING = "Dummy String";

describe("Class: Tinter (Node/16-color ANSI mode)", function() {

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
            expect(Tinter.bright(DUMMY_STRING)).toBe(`\x1b[1m${DUMMY_STRING}\x1b[0m`);
        });

        it("should be able mark a string as dim", function() {
            expect(Tinter.dim(DUMMY_STRING)).toBe(`\x1b[2m${DUMMY_STRING}\x1b[0m`);
        });

        it("should be able mark a string as italic", function() {
            expect(Tinter.italic(DUMMY_STRING)).toBe(`\x1b[3m${DUMMY_STRING}\x1b[0m`);
        });

        it("should be able mark a string as underscored", function() {
            expect(Tinter.underline(DUMMY_STRING)).toBe(`\x1b[4m${DUMMY_STRING}\x1b[0m`);
        });

        it("should be able mark a string as blinking", function() {
            expect(Tinter.blink(DUMMY_STRING)).toBe(`\x1b[5m${DUMMY_STRING}\x1b[0m`);
        });

        it("should be able mark a string as inversed", function() {
            expect(Tinter.inverse(DUMMY_STRING)).toBe(`\x1b[7m${DUMMY_STRING}\x1b[0m`);
        });

        it("should be able mark a string as hidden", function() {
            expect(Tinter.hidden(DUMMY_STRING)).toBe(`\x1b[8m${DUMMY_STRING}\x1b[0m`);
        });

        it("should be able mark a string as black", function() {
            expect(Tinter.black(DUMMY_STRING)).toBe(`\x1b[1m\x1b[30m${DUMMY_STRING}\x1b[0m`);
        });

        it("should be able mark a string as red", function() {
            expect(Tinter.red(DUMMY_STRING)).toBe(`\x1b[1m\x1b[91m${DUMMY_STRING}\x1b[0m`);
        });

        it("should be able mark a string as green", function() {
            expect(Tinter.green(DUMMY_STRING)).toBe(`\x1b[1m\x1b[32m${DUMMY_STRING}\x1b[0m`);
        });

        it("should be able mark a string as yellow", function() {
            expect(Tinter.yellow(DUMMY_STRING)).toBe(`\x1b[1m\x1b[93m${DUMMY_STRING}\x1b[0m`);
        });

        it("should be able mark a string as blue", function() {
            expect(Tinter.blue(DUMMY_STRING)).toBe(`\x1b[1m\x1b[94m${DUMMY_STRING}\x1b[0m`);
        });

        it("should be able mark a string as magenta", function() {
            expect(Tinter.magenta(DUMMY_STRING)).toBe(`\x1b[1m\x1b[95m${DUMMY_STRING}\x1b[0m`);
        });

        it("should be able mark a string as cyan", function() {
            expect(Tinter.cyan(DUMMY_STRING)).toBe(`\x1b[1m\x1b[96m${DUMMY_STRING}\x1b[0m`);
        });

        it("should be able mark a string as white", function() {
            expect(Tinter.white(DUMMY_STRING)).toBe(`\x1b[1m\x1b[97m${DUMMY_STRING}\x1b[0m`);
        });

        it("should be able mark a string with a black background", function() {
            expect(Tinter.blackBg(DUMMY_STRING)).toBe(`\x1b[1m\x1b[40m${DUMMY_STRING}\x1b[0m`);
        });

        it("should be able mark a string with a red background", function() {
            expect(Tinter.redBg(DUMMY_STRING)).toBe(`\x1b[1m\x1b[101m${DUMMY_STRING}\x1b[0m`);
        });

        it("should be able mark a string with a green background", function() {
            expect(Tinter.greenBg(DUMMY_STRING)).toBe(`\x1b[1m\x1b[42m${DUMMY_STRING}\x1b[0m`);
        });

        it("should be able mark a string with a yellow background", function() {
            expect(Tinter.yellowBg(DUMMY_STRING)).toBe(`\x1b[1m\x1b[103m${DUMMY_STRING}\x1b[0m`);
        });

        it("should be able mark a string with a blue background", function() {
            expect(Tinter.blueBg(DUMMY_STRING)).toBe(`\x1b[1m\x1b[104m${DUMMY_STRING}\x1b[0m`);
        });

        it("should be able mark a string with a magenta background", function() {
            expect(Tinter.magentaBg(DUMMY_STRING)).toBe(`\x1b[1m\x1b[105m${DUMMY_STRING}\x1b[0m`);
        });

        it("should be able mark a string with a cyan background", function() {
            expect(Tinter.cyanBg(DUMMY_STRING)).toBe(`\x1b[1m\x1b[106m${DUMMY_STRING}\x1b[0m`);
        });

        it("should be able mark a string with a white background", function() {
            expect(Tinter.whiteBg(DUMMY_STRING)).toBe(`\x1b[1m\x1b[107m${DUMMY_STRING}\x1b[0m`);
        });

        it("should be able mark a string with overlapping characteristics", function() {
            expect(Tinter.style(DUMMY_STRING, "yellow", "blue", "italic")).toBe(`\x1b[3m\x1b[1m\x1b[104m\x1b[1m\x1b[93m${DUMMY_STRING}\x1b[0m`);
        });

        it("should degrade a truecolor to 16-color appropriately.", function() {
            expect(Tinter.rgb(DUMMY_STRING, [255,255,127], [192, 0, 55], "underline")).toBe(`\x1b[4m\x1b[1m\x1b[101m\x1b[1m\x1b[93m${DUMMY_STRING}\x1b[0m`);
        });

        it("should correctly support ANSI named colors", function() {
            expect(Tinter.Black(DUMMY_STRING)).toBe(`\x1b[1m\x1b[30m${DUMMY_STRING}\x1b[0m`);
        });

        it("should correctly support CSS4 named colors", function() {
            expect(Tinter.rebeccapurple(DUMMY_STRING)).toBe(`\x1b[1m\x1b[34m${DUMMY_STRING}\x1b[0m`);
        });
    });


    describe("Color degrading functions", function() {

        it("should degrade a truecolor RGB value to the correct named color - red.", function() {
            expect(Tinter._nearest16([200, 10, 21])).toBe("red");
        });

        it("should degrade a truecolor RGB value to the correct named color - green.", function() {
            expect(Tinter._nearest16([0, 128, 0])).toBe("green");
        });

        it("should degrade a truecolor RGB value to the correct named color - blue.", function() {
            expect(Tinter._nearest16([2, 0, 200])).toBe("blue");
        });

        it("should degrade a truecolor RGB value to the correct named color - random.", function() {
            expect(Tinter._nearest16([10, 127, 200])).toBe("blue");
        });

        //

        it("should degrade a set of truecolor RGB values correctly", function() {
            expect(Tinter._degrade(DUMMY_STRING, [200, 10, 21], [2, 0, 200], "italic")).toBe(`\x1b[3m\x1b[1m\x1b[104m\x1b[1m\x1b[91m${DUMMY_STRING}\x1b[0m`);
        });
    });

});

