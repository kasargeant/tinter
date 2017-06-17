function Color() {
    "use strict";

    // 2^x - x
    this.underline = function(text) {
        return `\x1b[4m${text}\x1b[0m`;
    };

    this.red = function(text) {
        return `\x1b[1m\x1b[91m${text}\x1b[0m`;
    };

    this.blueBg = function(text) {
        return `\x1b[1m\x1b[104m${text}\x1b[0m`;
    };

    this.underline.red = this.red;
    this.underline.blueBg = this.blueBg;
    this.red.underline = this.underline;
    this.red.blueBg = this.blueBg;
    this.blueBg.underline = this.underline;
    this.blueBg.red = this.red;
}


let color = new Color();
console.log(color.underline.blueBg.red("hi"));

