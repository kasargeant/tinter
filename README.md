# Tinter [![npm](https://img.shields.io/npm/v/tinter.svg)]() [![Build Status](https://travis-ci.org/kasargeant/tinter.svg?branch=master)](https://travis-ci.org/kasargeant/tinter)

![Tinter woodblock](/docs/img/woodblock_sharkhats.jpg "Attribution: https://www.flickr.com/photos/sharkhats/")

Tinter doesn't modify JavaScript's built-in string by default.  Instead, it colorizes text by inserting invisible unicode markers to tell the console how to color the text it's working with.

So Tinter's colored strings - are simply ordinary JavaScript strings... and will do anything an ordinary JavaScript string will do.

## Features

* **Full 16M+ color support** across all capable consoles.
* **Smart color-degrading** to seamlessly support 256 and 16-color consoles.
* **A single and minimal API** - same coloration code for a windows WebStorm terminal as an Apple laptop console. 
* **Super-fast performance...** 6x faster than *colors.js* and 10x faster than *chalk*!!!
* **256 standard named colors** for easy usage - both [CSS4 Named Colors](https://www.w3.org/TR/css-color-4/#named-colors) as well as standard ANSI. 
* Clean, vanilla JS implementation - **safe by default**.  A drop-in module that plays nicely with other code.

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

#### Composing styles

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

#### Overlaying styles:-

```javascript
console.log(color.style("I'm multi-styled!", "cornflowerblue", "orange", "italic"));
```

#### Injecting Tinter directly into String.

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

### Named colors

To make Tinter as easy to work with as possible - the MOST - standardised and generally accepted naming was selected.

Thus Tinter specificially supports both the new **lowercased** [CSS4 Named Colors](https://www.w3.org/TR/css-color-4/#named-colors) as well as the standard and older **camel-cased** ANSI color naming schemes. 

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

## Performance

Tinter has been benchmarked on Node versions upwards of v6.10.  Running on a recent Apple laptop - results for simple coloration were:-

    chalk - single foreground color x 1,909,640 ops/sec ±0.78% (89 runs sampled)
    colors - single foreground color x 3,740,251 ops/sec ±1.33% (85 runs sampled)
    colors (unsafe) - single foreground color x 5,656,336 ops/sec ±0.89% (88 runs sampled)
    tinter - single foreground color x 17,613,603 ops/sec ±0.94% (88 runs sampled)
    Fastest is tinter - single foreground color

For composition:-

    <-- TODO: ADD IMAGE -->
