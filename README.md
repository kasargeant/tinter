# Tinter

![Tinter woodblock](/docs/img/woodblock_sharkhats.jpg "Attribution: https://www.flickr.com/photos/sharkhats/")

Tinter doesn't modify JavaScript's built-in string - or any other nastiness!  Instead, it colorizes text by inserting invisible unicode markers to tell the console how to color the text it's working with.

So Tinter's colored strings - are simply ordinary JavaScript strings... and will do anything an ordinary JavaScript string will do.

Ok to start coloring - we just import it at the top of the script with whatever name seems most useful to you.  For example,

```javascript
const Tinter = require("tinter");   // 'Pure'...
const color = require("tinter");    // Or 'pragmatic'... ;)
```                         

Single style or color:-

```javascript
console.log(color.green("I'm green!"));

console.log(color.redBg("I've a red background!"));

console.log(color.underline("This text uses underline."));
```

Multiple styles using CSS naming:-

```javascript
console.log(color.style("I'm multi-styled!", "cornflowerblue", "orange", "italic"));
```
Composing styles

```javascript
let composed = "I'm " + color.green("green") + " and " + color.red("red") + " together.";
console.log(composed);

let composed = `I'm ${color.green("blue")} and ${color.red("white")} together.`;
console.log(composed);
```

TrueColor support.
    
If your console supports TrueColor then Tinter can give you access to it's full 16M+ RGB color palette.

```javascript
console.log(color.style("I'm multi-styled!", [255,255,128], [192, 0, 55], "italic"));
```
