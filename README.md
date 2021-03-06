# Tinter [![npm](https://img.shields.io/npm/v/tinter.svg)]() [![Build Status](https://travis-ci.org/kasargeant/tinter.svg?branch=master)](https://travis-ci.org/kasargeant/tinter) [![Build Status Windows](https://ci.appveyor.com/api/projects/status/github/kasargeant/tinter?branch=master&svg=true)](https://ci.appveyor.com/project/kasargeant/tinter) [![Coverage Status](https://coveralls.io/repos/github/kasargeant/tinter/badge.svg?branch=master)](https://coveralls.io/github/kasargeant/tinter?branch=master)

![Tinter woodblock](/docs/img/woodblock_sharkhats.jpg "Attribution: https://www.flickr.com/photos/sharkhats/")

Tinter doesn't modify JavaScript's built-in string by default.  Instead, it colorizes text by inserting invisible unicode markers to tell the console how to color the text it's working with.

So Tinter's colored strings - are simply ordinary JavaScript strings... and will do anything an ordinary JavaScript string will do.

## Features

* **Full 16M+ color support** across all capable consoles.
* **Smart color-degrading** to seamlessly support 256 and 16-color consoles.
* **A single and minimal API** - same coloration code for a windows WebStorm terminal as an Apple laptop console. 
* **Super-fast performance...** 5x faster than *colors.js* and 10x faster than *chalk*!!!
* **256 standard named colors** for easy usage - both [CSS4 Named Colors](https://www.w3.org/TR/css-color-4/#named-colors) as well as standard ANSI. 
* Clean, vanilla JS implementation - **safe by default**.  A drop-in module that plays nicely with other code.


### Named colors

Tinter supports both the new **lowercased** [CSS4 Named Colors](https://www.w3.org/TR/css-color-4/#named-colors) as well as the standard and older **camel-cased** ANSI color naming schemes. 

```javascript
console.log(color.rebeccapurple("Hi I'm CSS4's Rebecca Purple!"));
console.log(color.DeepSkyBlue2("Hi I'm ANSI's DeepSkyBlue... 2!"));
```

#### CSS4 Named Color Set

![Tinter supports CSS4 Named Colors](/docs/img/tinter_css4_named_foreground_16M.png "Foreground colors")

![Tinter supports CSS4 Named Colors](/docs/img/tinter_css4_named_background_16M.png "Foreground colors")

#### ANSI Named Color Set

![Tinter supports ANSI Named Colors](/docs/img/tinter_ansi256_foreground_apple.png "Foreground colors")

![Tinter supports ANSI Named Colors](/docs/img/tinter_ansi256_background_apple.png "Foreground colors")

#### RGB colors (...and using the 16M+ color palette)
    
If your console supports TrueColor then Tinter can give you access to it's full 16M+ RGB color palette.

```javascript
console.log(color.style("I'm using direct RGB values!!!", [255,255,128], [192, 0, 55], "italic"));
```

## Install

    npm install tinter

## Quick Start

Ok to start coloring - we just import it at the top of the script with whatever name seems most useful to you.  For example,

```javascript
const Tinter = require("tinter");   // In a 'Pure and correct' manner...
const color = require("tinter");    // Or as a 'compatible' drop-in... :)
const tint = require("tinter");     // Or just short and 'pragmatic'...
```                         

#### Single style or color:-

```javascript
console.log(color.green("I'm green!"));

console.log(color.redBg("I've a red background!"));

console.log(color.underline("This text uses underline."));
```

#### Composing styles/colors

Tinter allows you to compose multi-colored text in a number of ways:-

As simple concatenation of self-contained colored 'blocks':-

```javascript
let composed = "I'm " + color.green("green") + " and " + color.red("red") + " together.";
console.log(composed);

let composed = `I'm ${color.green("blue")} and ${color.red("white")} together.`;
console.log(composed);
```

Or as a 'stream'-style coloration - that is even more efficient! - but requires a manual 'reset' when you wish to return text to default coloration.:-

```javascript
let streamed = `I'm ${color.green()}first green then ${color.underline()}with underline too${color.reset()} and then ${color.red()}red to the end.${color.reset()}`;
console.log(streamed);
```

#### Overlaying styles/colors:-

```javascript
console.log(color.style("I'm multi-styled!", "cornflowerblue", "orange", "italic"));
```

#### Stacking styles/colors

Limited to the core eight console colors (black, red, yellow, blue, green, magenta, cyan and white)
\- but often much more convenient to use \- you can also stack colors and style with syntax: *color.colorBg.style*

```javascript
console.log(color.yellow("Yellow text."));
console.log(color.yellow.blackBg("Yellow text on a black background."));
console.log(color.default.greenBg("Default text on a green background."));
console.log(color.red.defaultBg.bright("Red text, default background using 'bright' mode."));
console.log(color.yellow.blueBg.underline("Yellow text on a blue background and underlined."));
console.log(color.blue.whiteBg("Blue text on a white background."));
console.log(color.blue.whiteBg.inverse("Blue text on a white background - but with inverted colors."));
```

#### Injecting Tinter directly into JS's String.

A lot of developers like the colors.js approach of directly extending the built-in string - to facilitate simpler, shorter coding.

Although Tinter's default API uses a safe approach that doesn't extend built-ins like this... you can!... if you really want. ;)

To do this just import the alternative version:

```javascript
const Tinter = require("tinter/inject");     // This will not load standard Tinter.
                                            // but extend String instead.
``` 
And from now on you can use coloration directly on any string using the shortened notation:-

```javascript
let myString = "hi there";
console.log(myString);
console.log(myString.underline);
console.log(myString.blue);
console.log(myString.greenBg);
console.log("->" + myString.red.yellowBg.underline + "<-");
console.log(myString);
``` 

## Performance

### General usage

Tinter has been benchmarked on Node versions upwards of v6.10.  Running on a recent Apple laptop - results for simple coloration were:-

    chalk           - single color x  1,909,640 ops/sec ±0.78% (89 runs sampled)
    colors          - single color x  3,740,251 ops/sec ±1.33% (85 runs sampled)
    colors (unsafe) - single color x  5,656,336 ops/sec ±0.89% (88 runs sampled)
    tinter          - single color x 17,613,603 ops/sec ±0.94% (88 runs sampled)
    
    Fastest is: 'tinter - single color'.

For stacked composition (e.g. tinter.red.blueBg.underline("hi there!"); ):-

    chalk           - stacked color/styles x   470,192 ops/sec ±1.00% (89 runs sampled)
    colors          - stacked color/styles x   733,671 ops/sec ±1.04% (89 runs sampled)
    tinter          - stacked color/styles x 8,176,748 ops/sec ±1.20% (83 runs sampled)
    
    Fastest is: 'tinter - stacked color/styles'.

### Unsafe (build-in extending versions)

Colors.js also offers an unsafe version of its library with a shorter syntax and better performance.  

What makes it 'unsafe' is the fact that it directly extends the built-in string prototype and that can cause problems with other modules' usage of strings.

Tinter offers an unsafe equivalent too - but only for code compatibility reasons.  We strongly recommend against you using either unsafe library!  

However, if you wish to upgrade your codebase to use Tinter but unfortunately have large amounts of legacy 'colors' code that's currently impractical to rewrite - Tinter/Inject's your solution.  

Anyway, just for completeness and to demonstrate the poor performance of this approach... benchmarks for the unsafe versions are:-

    colors (unsafe)    - single color x  5,679,025 ops/sec ±1.35% (87 runs sampled)
    tinter (unsafe)    - single color x  5,825,590 ops/sec ±0.78% (87 runs sampled)
  
Finally, to summarize, it seems clear that both in terms of its range of usable colors and in terms of sheer string-crunching performance - Tinter rocks!

We hope you will like it too!

## License

Tinter was written by Kyle Alexis Sargeant and is shared under the LGPL-3.0 license.  

So basically you can use it freely in anything - both open-source or commercial - without any need to disclose your own code.
