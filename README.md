# Tinter

![Tinter woodblock](/docs/img/woodblock_sharkhats.jpg "Attribution: https://www.flickr.com/photos/sharkhats/")

Tinter doesn't modify JavaScript's built-in string by default.  Instead, it colorizes text by inserting invisible unicode markers to tell the console how to color the text it's working with.

So Tinter's colored strings - are simply ordinary JavaScript strings... and will do anything an ordinary JavaScript string will do.

## Features

* **Full 16M+ color support** across all capable consoles.
* **Smart color-degrading** to seamlessly support 256 and 16-color consoles.
* **A single and minimal API** - same coloration code for a windows WebStorm terminal as an Apple laptop console. 
* Super-fast performance... 6x faster than *colors.js* and 10x faster than *chalk*!!!
* Clean, vanilla JS implementation - safe by default.  A drop-in module that plays nicely with other code.
* Supports both [CSS4 Named Colors](https://www.w3.org/TR/css-color-4/#named-colors) as well as standard ANSI naming. 

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

### Named colors

To make Tinter as easy to work with as possible - the MOST - standardised and generally accepted naming was selected.

Thus Tinter specificially supports both the new **lowercased** [CSS4 Named Colors](https://www.w3.org/TR/css-color-4/#named-colors) as well as the standard and older **camel-cased** ANSI color naming schemes. 

```javascript
console.log(color.rebeccapurple("Hi I'm CSS4's Rebecca Purple!"));
console.log(color.DeepSkyBlue2("Hi I'm ANSI's DeepSkyBlue... 2!"));
```


#### RGB colors (...and using the 16M+ color palette)
    
If your console supports TrueColor then Tinter can give you access to it's full 16M+ RGB color palette.

```javascript
console.log(color.style("I'm using direct RGB values!!!", [255,255,128], [192, 0, 55], "italic"));
```

