/**
 * @file Tinter.js
 * @description The Tinter class.  A lean and fast console string colorizing module - supports CSS naming and up to 16M+ colors.
 * @author Kyle Alexis Sargeant <kasargeant@gmail.com> {@link https://github.com/kasargeant https://github.com/kasargeant}.
 * @copyright Kyle Alexis Sargeant 2017
 * @license See LICENSE file included in this distribution.
 */


"use strict";
// console.log(JSON.stringify(process.env, null, 2)); // DEBUG ONLY

// Imports... nothing.

// Defaults
let config = {
    scheme: "16",
    isBrowser: false,
    debug: false
};
const schemes = ["8", "16", "256", "16M"];
//console.info(process.env);
if(process.env.TINTER_TEST === undefined) {

    //"darwin", "freebsd", "linux", "sunos", "win32"

    // if(process.env.CLICOLOR === "1") {
    //     // No need to do anything
    // } else {console.warn("Warning: Environment variable CLICOLOR is missing or set to zero/no color.");}

    switch(process.env.TERM) {
        case "xterm":
            config.scheme = "16";
            break; // In theory, just 8!
        case "xterm-color":
            config.scheme = "16";
            break;
        case "xterm-16color":
            config.scheme = "16";
            break;
        case "xterm-256color":
            switch(process.env.TERM_PROGRAM) {
                case "Apple_Terminal":
                    config.scheme = "16M";
                    break;
                case "iTerm.app":
                    config.scheme = "16M";
                    break;
                default:
                    if(process.env.FORCE_COLOR === "true") {
                        config.scheme = "16";
                    } else {
                        config.scheme = "256";
                    }
                    // Programs like WS have no TERM_PROGRAM VALUE... assume 8/16-color only
            }
            break;
    }

    // TODO - implement smart color selection if COLORFGBG is set.
    // if(process.env.COLORFGBG !== undefined) {
    //     let [fg, bg] = process.env.COLORFGBG.split(";");
    //     console.log(`setEnv: FG: ${fg}`);
    //     console.log(`setEnv: BG: ${bg}`);
    // }
} else if(schemes.includes(process.env.TINTER_TEST)) {
    config.scheme = process.env.TINTER_TEST;
}

//console.log(`setEnv: Determined color scheme: ${defaults.scheme}`);

const colors = [
    ["Black",[0,0,0],16,30],
    ["Grey0",[0,0,0],16,30],
    ["black",[0,0,0],16,30],
    ["NavyBlue",[0,0,95],18,30],
    ["midnightblue",[25,25,112],18,30],
    ["Navy",[0,0,128],19,34],
    ["navy",[0,0,128],19,34],
    ["DarkBlue",[0,0,135],19,34],
    ["darkblue",[0,0,139],19,34],
    ["Blue3",[0,0,175],19,34],
    ["mediumblue",[0,0,205],20,94],
    ["Blue3",[0,0,215],20,94],
    ["Blue1",[0,0,255],21,94],
    ["blue",[0,0,255],21,94],
    ["darkgreen",[0,100,0],28,30],
    ["DarkGreen",[0,95,0],28,30],
    ["DeepSkyBlue4",[0,95,95],30,30],
    ["DeepSkyBlue4",[0,95,135],31,34],
    ["DeepSkyBlue4",[0,95,175],31,34],
    ["DodgerBlue3",[0,95,215],32,94],
    ["DodgerBlue2",[0,95,255],33,94],
    ["Green",[0,128,0],34,32],
    ["green",[0,128,0],34,32],
    ["Green4",[0,135,0],34,32],
    ["Green3",[0,175,0],34,32],
    ["SpringGreen4",[0,135,95],36,32],
    ["SpringGreen3",[0,175,95],36,32],
    ["Teal",[0,128,128],37,36],
    ["teal",[0,128,128],37,36],
    ["Turquoise4",[0,135,135],37,36],
    ["DeepSkyBlue3",[0,135,175],37,36],
    ["darkcyan",[0,139,139],37,36],
    ["DarkCyan",[0,175,135],37,36],
    ["LightSeaGreen",[0,175,175],37,36],
    ["DeepSkyBlue3",[0,135,215],38,96],
    ["DeepSkyBlue2",[0,175,215],38,96],
    ["DodgerBlue1",[0,135,255],39,96],
    ["DeepSkyBlue1",[0,175,255],39,96],
    ["Green3",[0,215,0],40,92],
    ["SpringGreen3",[0,215,95],42,92],
    ["SpringGreen2",[0,215,135],43,96],
    ["Cyan3",[0,215,175],43,96],
    ["darkturquoise",[0,206,209],44,96],
    ["DarkTurquoise",[0,215,215],44,96],
    ["deepskyblue",[0,191,255],45,96],
    ["Turquoise2",[0,215,255],45,96],
    ["Green1",[0,255,0],46,92],
    ["lime",[0,255,0],46,92],
    ["springgreen",[0,255,127],48,92],
    ["SpringGreen2",[0,255,95],48,92],
    ["mediumspringgreen",[0,250,154],49,96],
    ["SpringGreen1",[0,255,135],49,96],
    ["MediumSpringGreen",[0,255,175],49,96],
    ["Cyan2",[0,255,215],50,96],
    ["Cyan1",[0,255,255],51,96],
    ["aqua",[0,255,255],51,96],
    ["cyan",[0,255,255],51,96],
    ["indigo",[75,0,130],55,34],
    ["darkslateblue",[72,61,139],61,34],
    ["darkslategray",[47,79,79],66,30],
    ["darkslategrey",[47,79,79],66,30],
    ["royalblue",[65,105,225],68,94],
    ["forestgreen",[34,139,34],71,32],
    ["seagreen",[46,139,87],72,32],
    ["lightseagreen",[32,178,170],73,36],
    ["steelblue",[70,130,180],74,36],
    ["dodgerblue",[30,144,255],75,96],
    ["limegreen",[50,205,50],77,92],
    ["mediumseagreen",[60,179,113],78,32],
    ["turquoise",[64,224,208],80,96],
    ["mediumturquoise",[72,209,204],80,96],
    ["DarkRed",[95,0,0],88,30],
    ["DeepPink4",[95,0,95],90,30],
    ["Purple4",[95,0,135],91,34],
    ["Purple4",[95,0,175],91,34],
    ["Purple3",[95,0,215],92,94],
    ["BlueViolet",[95,0,255],93,94],
    ["rebeccapurple",[102,51,153],97,34],
    ["Orange4",[95,95,0],100,30],
    ["darkolivegreen",[85,107,47],101,30],
    ["MediumPurple4",[95,95,135],103,34],
    ["SlateBlue3",[95,95,175],103,34],
    ["slateblue",[106,90,205],104,94],
    ["SlateBlue3",[95,95,215],104,94],
    ["mediumslateblue",[123,104,238],105,94],
    ["RoyalBlue1",[95,95,255],105,94],
    ["Chartreuse4",[95,135,0],106,32],
    ["Chartreuse3",[95,175,0],106,32],
    ["olivedrab",[107,142,35],107,32],
    ["DarkSeaGreen4",[95,135,95],108,32],
    ["DarkSeaGreen4",[95,175,95],108,32],
    ["slategray",[112,128,144],109,36],
    ["slategrey",[112,128,144],109,36],
    ["lightslategray",[119,136,153],109,36],
    ["lightslategrey",[119,136,153],109,36],
    ["PaleTurquoise4",[95,135,135],109,36],
    ["SteelBlue",[95,135,175],109,36],
    ["cadetblue",[95,158,160],109,36],
    ["CadetBlue",[95,175,135],109,36],
    ["CadetBlue",[95,175,175],109,36],
    ["SteelBlue3",[95,135,215],110,96],
    ["SkyBlue3",[95,175,215],110,96],
    ["cornflowerblue",[100,149,237],111,96],
    ["CornflowerBlue",[95,135,255],111,96],
    ["SteelBlue1",[95,175,255],111,96],
    ["Chartreuse3",[95,215,0],112,92],
    ["PaleGreen3",[95,215,95],114,92],
    ["mediumaquamarine",[102,205,170],115,96],
    ["SeaGreen3",[95,215,135],115,96],
    ["Aquamarine3",[95,215,175],115,96],
    ["MediumTurquoise",[95,215,215],116,96],
    ["SteelBlue1",[95,215,255],117,96],
    ["lawngreen",[124,252,0],118,92],
    ["chartreuse",[127,255,0],118,92],
    ["Chartreuse2",[95,255,0],118,92],
    ["SeaGreen2",[95,255,95],120,92],
    ["SeaGreen1",[95,255,135],121,96],
    ["SeaGreen1",[95,255,175],121,96],
    ["aquamarine",[127,255,212],122,96],
    ["Aquamarine1",[95,255,215],122,96],
    ["DarkSlateGray2",[95,255,255],123,96],
    ["Maroon",[128,0,0],124,31],
    ["maroon",[128,0,0],124,31],
    ["DarkRed",[135,0,0],124,31],
    ["darkred",[139,0,0],124,31],
    ["Red3",[175,0,0],124,31],
    ["DeepPink4",[135,0,95],126,31],
    ["DeepPink4",[175,0,95],126,31],
    ["Purple",[128,0,128],127,35],
    ["purple",[128,0,128],127,35],
    ["DarkMagenta",[135,0,135],127,35],
    ["DarkMagenta",[135,0,175],127,35],
    ["darkmagenta",[139,0,139],127,35],
    ["MediumVioletRed",[175,0,135],127,35],
    ["Magenta3",[175,0,175],127,35],
    ["DarkViolet",[135,0,215],128,95],
    ["darkviolet",[148,0,211],128,95],
    ["DarkViolet",[175,0,215],128,95],
    ["Purple",[135,0,255],129,95],
    ["Purple",[175,0,255],129,95],
    ["saddlebrown",[139,69,19],130,31],
    ["brown",[165,42,42],131,31],
    ["firebrick",[178,34,34],131,31],
    ["blueviolet",[138,43,226],134,95],
    ["darkorchid",[153,50,204],134,95],
    ["Orange4",[135,95,0],136,31],
    ["DarkOrange3",[175,95,0],136,31],
    ["sienna",[160,82,45],137,31],
    ["LightPink4",[135,95,95],138,31],
    ["IndianRed",[175,95,95],138,31],
    ["Plum4",[135,95,135],139,35],
    ["MediumPurple3",[135,95,175],139,35],
    ["HotPink3",[175,95,135],139,35],
    ["MediumOrchid3",[175,95,175],139,35],
    ["MediumPurple3",[135,95,215],140,95],
    ["mediumpurple",[147,112,219],140,95],
    ["MediumOrchid",[175,95,215],140,95],
    ["SlateBlue1",[135,95,255],141,95],
    ["MediumPurple2",[175,95,255],141,95],
    ["Olive",[128,128,0],142,33],
    ["olive",[128,128,0],142,33],
    ["Yellow4",[135,135,0],142,33],
    ["Yellow4",[135,175,0],142,33],
    ["DarkGoldenrod",[175,135,0],142,33],
    ["Gold3",[175,175,0],142,33],
    ["Wheat4",[135,135,95],144,33],
    ["DarkOliveGreen3",[135,175,95],144,33],
    ["LightSalmon3",[175,135,95],144,33],
    ["DarkKhaki",[175,175,95],144,33],
    ["LightSlateGrey",[135,135,175],145,37],
    ["DarkSeaGreen",[135,175,135],145,37],
    ["LightSkyBlue3",[135,175,175],145,37],
    ["RosyBrown",[175,135,135],145,37],
    ["Grey63",[175,135,175],145,37],
    ["NavajoWhite3",[175,175,135],145,37],
    ["MediumPurple",[135,135,215],146,97],
    ["LightSkyBlue3",[135,175,215],146,97],
    ["MediumPurple2",[175,135,215],146,97],
    ["LightSteelBlue3",[175,175,215],146,97],
    ["LightSlateBlue",[135,135,255],147,97],
    ["SkyBlue2",[135,175,255],147,97],
    ["MediumPurple1",[175,135,255],147,97],
    ["LightSteelBlue",[175,175,255],147,97],
    ["Chartreuse2",[135,215,0],148,93],
    ["Yellow3",[175,215,0],148,93],
    ["yellowgreen",[154,205,50],149,93],
    ["DarkOliveGreen3",[135,215,95],150,93],
    ["DarkOliveGreen3",[175,215,95],150,93],
    ["darkseagreen",[143,188,143],151,37],
    ["PaleGreen3",[135,215,135],151,97],
    ["DarkSeaGreen3",[135,215,175],151,97],
    ["DarkSeaGreen3",[175,215,135],151,97],
    ["DarkSeaGreen2",[175,215,175],151,97],
    ["DarkSlateGray3",[135,215,215],152,97],
    ["LightCyan3",[175,215,215],152,97],
    ["lightsteelblue",[176,196,222],152,97],
    ["skyblue",[135,206,235],153,97],
    ["lightskyblue",[135,206,250],153,97],
    ["SkyBlue1",[135,215,255],153,97],
    ["lightblue",[173,216,230],153,97],
    ["LightSkyBlue1",[175,215,255],153,97],
    ["powderblue",[176,224,230],153,97],
    ["Chartreuse1",[135,255,0],154,93],
    ["GreenYellow",[175,255,0],154,93],
    ["greenyellow",[173,255,47],155,93],
    ["LightGreen",[135,255,95],156,93],
    ["DarkOliveGreen2",[175,255,95],156,93],
    ["LightGreen",[135,255,135],157,97],
    ["PaleGreen1",[135,255,175],157,97],
    ["lightgreen",[144,238,144],157,97],
    ["palegreen",[152,251,152],157,97],
    ["PaleGreen1",[175,255,135],157,97],
    ["DarkSeaGreen2",[175,255,175],157,97],
    ["Aquamarine1",[135,255,215],158,97],
    ["DarkSeaGreen1",[175,255,215],158,97],
    ["DarkSlateGray1",[135,255,255],159,97],
    ["paleturquoise",[175,238,238],159,97],
    ["PaleTurquoise1",[175,255,255],159,97],
    ["Red3",[215,0,0],160,91],
    ["crimson",[220,20,60],161,91],
    ["DeepPink3",[215,0,95],162,91],
    ["mediumvioletred",[199,21,133],163,95],
    ["DeepPink3",[215,0,135],163,95],
    ["Magenta3",[215,0,175],163,95],
    ["Magenta3",[215,0,215],164,95],
    ["Magenta2",[215,0,255],165,95],
    ["DarkOrange3",[215,95,0],172,91],
    ["chocolate",[210,105,30],173,91],
    ["indianred",[205,92,92],174,91],
    ["IndianRed",[215,95,95],174,91],
    ["HotPink3",[215,95,135],175,95],
    ["HotPink2",[215,95,175],175,95],
    ["palevioletred",[219,112,147],175,95],
    ["mediumorchid",[186,85,211],176,95],
    ["Orchid",[215,95,215],176,95],
    ["orchid",[218,112,214],176,95],
    ["MediumOrchid1",[215,95,255],177,95],
    ["darkgoldenrod",[184,134,11],178,33],
    ["Orange3",[215,135,0],178,93],
    ["Gold3",[215,175,0],178,93],
    ["peru",[205,133,63],179,93],
    ["goldenrod",[218,165,32],179,93],
    ["LightSalmon3",[215,135,95],180,93],
    ["LightGoldenrod3",[215,175,95],180,93],
    ["rosybrown",[188,143,143],181,37],
    ["LightPink3",[215,135,135],181,97],
    ["Pink3",[215,135,175],181,97],
    ["Tan",[215,175,135],181,97],
    ["MistyRose3",[215,175,175],181,97],
    ["Plum3",[215,135,215],182,97],
    ["Thistle3",[215,175,215],182,97],
    ["plum",[221,160,221],182,97],
    ["Violet",[215,135,255],183,97],
    ["Plum2",[215,175,255],183,97],
    ["Yellow3",[215,215,0],184,93],
    ["darkkhaki",[189,183,107],186,33],
    ["Khaki3",[215,215,95],186,93],
    ["tan",[210,180,140],187,97],
    ["LightGoldenrod2",[215,215,135],187,97],
    ["LightYellow3",[215,215,175],187,97],
    ["burlywood",[222,184,135],187,97],
    ["thistle",[216,191,216],188,97],
    ["LightSteelBlue1",[215,215,255],189,97],
    ["Yellow2",[215,255,0],190,93],
    ["DarkOliveGreen1",[215,255,95],192,93],
    ["DarkOliveGreen1",[215,255,135],193,97],
    ["DarkSeaGreen1",[215,255,175],193,97],
    ["Honeydew2",[215,255,215],194,97],
    ["LightCyan1",[215,255,255],195,97],
    ["lightcyan",[224,255,255],195,97],
    ["Red1",[255,0,0],196,91],
    ["red",[255,0,0],196,91],
    ["DeepPink2",[255,0,95],198,91],
    ["DeepPink1",[255,0,135],199,95],
    ["DeepPink1",[255,0,175],199,95],
    ["deeppink",[255,20,147],199,95],
    ["Magenta2",[255,0,215],200,95],
    ["Magenta1",[255,0,255],201,95],
    ["fuchsia",[255,0,255],201,95],
    ["magenta",[255,0,255],201,95],
    ["orangered",[255,69,0],202,91],
    ["OrangeRed1",[255,95,0],208,91],
    ["tomato",[255,99,71],209,91],
    ["coral",[255,127,80],210,91],
    ["IndianRed1",[255,95,95],210,91],
    ["IndianRed1",[255,95,135],211,95],
    ["HotPink",[255,95,175],211,95],
    ["hotpink",[255,105,180],212,95],
    ["HotPink",[255,95,215],212,95],
    ["MediumOrchid1",[255,95,255],213,95],
    ["DarkOrange",[255,135,0],214,93],
    ["darkorange",[255,140,0],214,93],
    ["orange",[255,165,0],214,93],
    ["Orange1",[255,175,0],214,93],
    ["darksalmon",[233,150,122],216,93],
    ["sandybrown",[244,164,96],216,93],
    ["salmon",[250,128,114],216,93],
    ["Salmon1",[255,135,95],216,93],
    ["lightsalmon",[255,160,122],216,93],
    ["SandyBrown",[255,175,95],216,93],
    ["lightcoral",[240,128,128],217,97],
    ["LightCoral",[255,135,135],217,97],
    ["PaleVioletRed1",[255,135,175],217,97],
    ["LightSalmon1",[255,175,135],217,97],
    ["LightPink1",[255,175,175],217,97],
    ["Orchid2",[255,135,215],218,97],
    ["Pink1",[255,175,215],218,97],
    ["violet",[238,130,238],219,97],
    ["Orchid1",[255,135,255],219,97],
    ["Plum1",[255,175,255],219,97],
    ["Gold1",[255,215,0],220,93],
    ["gold",[255,215,0],220,93],
    ["LightGoldenrod2",[255,215,95],222,93],
    ["LightGoldenrod2",[255,215,135],223,97],
    ["NavajoWhite1",[255,215,175],223,97],
    ["navajowhite",[255,222,173],223,97],
    ["wheat",[245,222,179],224,97],
    ["lightpink",[255,182,193],224,97],
    ["pink",[255,192,203],224,97],
    ["MistyRose1",[255,215,215],224,97],
    ["peachpuff",[255,218,185],224,97],
    ["moccasin",[255,228,181],224,97],
    ["bisque",[255,228,196],224,97],
    ["mistyrose",[255,228,225],224,97],
    ["Thistle1",[255,215,255],225,97],
    ["Yellow1",[255,255,0],226,93],
    ["yellow",[255,255,0],226,93],
    ["LightGoldenrod1",[255,255,95],228,93],
    ["palegoldenrod",[238,232,170],229,97],
    ["khaki",[240,230,140],229,97],
    ["Khaki1",[255,255,135],229,97],
    ["Wheat1",[255,255,175],229,97],
    ["beige",[245,245,220],230,97],
    ["antiquewhite",[250,235,215],230,97],
    ["lightgoldenrodyellow",[250,250,210],230,97],
    ["blanchedalmond",[255,235,205],230,97],
    ["papayawhip",[255,239,213],230,97],
    ["cornsilk",[255,248,220],230,97],
    ["lemonchiffon",[255,250,205],230,97],
    ["Cornsilk1",[255,255,215],230,97],
    ["lightyellow",[255,255,224],230,97],
    ["lavender",[230,230,250],231,97],
    ["aliceblue",[240,248,255],231,97],
    ["honeydew",[240,255,240],231,97],
    ["azure",[240,255,255],231,97],
    ["mintcream",[245,255,250],231,97],
    ["ghostwhite",[248,248,255],231,97],
    ["linen",[250,240,230],231,97],
    ["oldlace",[253,245,230],231,97],
    ["lavenderblush",[255,240,245],231,97],
    ["seashell",[255,245,238],231,97],
    ["floralwhite",[255,250,240],231,97],
    ["snow",[255,250,250],231,97],
    ["ivory",[255,255,240],231,97],
    ["Grey100",[255,255,255],231,97],
    ["white",[255,255,255],231,97],
    ["Grey3",[8,8,8],232,30],
    ["Grey7",[18,18,18],233,30],
    ["Grey11",[28,28,28],234,30],
    ["Grey15",[38,38,38],235,30],
    ["Grey19",[48,48,48],236,30],
    ["Grey23",[58,58,58],237,30],
    ["Grey27",[68,68,68],238,30],
    ["Grey30",[78,78,78],239,30],
    ["Grey35",[88,88,88],240,30],
    ["Grey37",[95,95,95],240,30],
    ["dimgray",[105,105,105],241,30],
    ["dimgrey",[105,105,105],241,30],
    ["Grey39",[98,98,98],241,30],
    ["Grey42",[108,108,108],242,30],
    ["Grey46",[118,118,118],243,30],
    ["Grey50",[128,128,128],244,37],
    ["gray",[128,128,128],244,37],
    ["grey",[128,128,128],244,37],
    ["Grey53",[135,135,135],244,37],
    ["Grey54",[138,138,138],245,37],
    ["Grey58",[148,148,148],246,37],
    ["Grey62",[158,158,158],247,37],
    ["Grey66",[168,168,168],248,37],
    ["darkgray",[169,169,169],248,37],
    ["darkgrey",[169,169,169],248,37],
    ["Grey69",[175,175,175],248,37],
    ["Grey70",[178,178,178],249,37],
    ["Grey74",[188,188,188],249,37],
    ["Silver",[192,192,192],250,97],
    ["silver",[192,192,192],250,97],
    ["Grey78",[198,198,198],250,97],
    ["Grey82",[208,208,208],251,97],
    ["lightgray",[211,211,211],252,97],
    ["lightgrey",[211,211,211],252,97],
    ["Grey84",[215,215,215],252,97],
    ["Grey85",[218,218,218],252,97],
    ["gainsboro",[220,220,220],253,97],
    ["Grey89",[228,228,228],253,97],
    ["Grey93",[238,238,238],254,97],
    ["whitesmoke",[245,245,245],255,97]
];

const styles = ["reset", "bright", "dim", "italic", "underline", "blink", "blink2", "inverse", "hidden"];

/**
 * @module Tinter
 */
const Tinter = {

    _styleTruecolor: function(text, color, colorBg, style) {

        let result = "";
        if(style !== undefined) {
            let i = styles.indexOf(style);
            if(i === -1) {
                console.error(`Error: Unrecognised text style: '${style}'.`);
                return text;
            }
            result += `\x1b[${i}m`;
        }
        if(colorBg !== undefined && colorBg.constructor === Array) {
            if(colorBg.length !== 3) {
                console.error(`Error: Unrecognised background color: '${colorBg}'.`);
                return text;
            }
            result += `\x1b[1m\x1b[48;2;${colorBg[0]};${colorBg[1]};${colorBg[2]}m`;

        }
        if(color !== undefined && color.constructor === Array) {
            if(color.length !== 3) {
                console.error(`Error: Unrecognised text color: '${color}'.`);
                return text;
            }
            result += `\x1b[1m\x1b[38;2;${color[0]};${color[1]};${color[2]}m`;
        }
        return result += `${text}\x1b[0m`;
    },

    /**
     * Marks the text string with multiple CSS and ANSI named color and style characteristics.
     * @param {string} text - the text string to be colorized and/or styled.
     * @param {string|Array} color - the name of the HTML color.
     * @param {string|Array} colorBg - the name of the HTML background color.
     * @param {string} style - the name of the HTML text style.
     * @returns {string} - the colorized/styled text string.
     * @static
     */
    style: function(text, color="default", colorBg="default", style="reset") {
        return `${this[style]()}${this[colorBg + "Bg"]()}${this[color]()}${text}\x1b[0m`;
    },

    /**
     * Marks the text string with multiple RGB colors and ANSI named style characteristics.
     * @param {string} text - the text string to be colorized and/or styled.
     * @param {Array} color - an RGB integer array representing the foreground color.
     * @param {Array} colorBg - an RGB integer array representing the foreground color.
     * @param {string} style - the name of the ANSI text style.
     * @returns {string} - the colorized/styled text string.
     * @static
     */
    rgb: function(text, color=[255,255,255], colorBg=[0,0,0], style="reset") {
        // First check for raw RGB truecolor code... if the console scheme
        // supports this then no probs... but if not - we need to degrade appropriately.
        if(color.constructor === Array && colorBg.constructor === Array) {
            if(config.scheme === "16M") {
                return this._styleTruecolor(text, color, colorBg, style);
            } else {
                return this._degrade(text, color, colorBg, style);
            }
        } else {
            console.error("Error: Unrecognized RGB array values or ANSI style.");
            return text;
        }
    },

    _nearest16: function(rgb) {
        let hasRed = false;
        let hasGreen = false;
        let hasBlue = false;
        let [r, g, b] = rgb;
        let nearest = null;
        if(r >= 128) {
            hasRed = true;
        }
        if(g >= 128) {
            hasGreen = true;
        }
        if(b >= 128) {
            hasBlue = true;
        }
        if(hasRed && hasGreen && hasBlue) {
            nearest = "white";
        } else if(hasRed && hasGreen && !hasBlue) {
            nearest = "yellow";
        } else if(hasRed && !hasGreen && hasBlue) {
            nearest = "magenta";
        } else if(hasRed && !hasGreen && !hasBlue) {
            nearest = "red";
        } else if(!hasRed && hasGreen && hasBlue) {
            nearest = "cyan";
        } else if(!hasRed && hasGreen && !hasBlue) {
            nearest = "green";
        } else if(!hasRed && !hasGreen && hasBlue) {
            nearest = "blue";
        } else if(!hasRed && !hasGreen && !hasBlue) {
            nearest = "black";
        }

        return nearest;
    },

    _degrade: function(text, color, colorBg, style) {

        let dColor = this._nearest16(color);
        let dColorBg = this._nearest16(colorBg);

        return this.style(text, dColor, dColorBg, style);
    }
};
////console.log("USING SCHEME: " + config.scheme); // DEBUG ONLY

/* jshint ignore:start */
for(let idx = 0; idx < styles.length; idx++) {
    let key = styles[idx];
    Tinter[key] = function(text) {
        if(text === undefined) {
            return `\x1b[${idx}m`;
        }
        return `\x1b[${idx}m${text}\x1b[0m`;
    };
}
for(let idx = 0; idx < colors.length; idx++) {
    let color = colors[idx];
    let key = color[0];
    let [r,g,b] = color[1];
    if(config.scheme === "16") {
        let degrade = color[3];
        Tinter[key] = function(text) {
            if(text === undefined) {
                return `\x1b[1m\x1b[${degrade}m`;
            }
            return `\x1b[1m\x1b[${degrade}m${text}\x1b[0m`;
        };
        Tinter[key + "Bg"] = function(text) {
            if(text === undefined) {
                return `\x1b[1m\x1b[${degrade + 10}m`;
            }
            return `\x1b[1m\x1b[${degrade + 10}m${text}\x1b[0m`;
        };
    } else if(config.scheme === "256") {
        let degrade = color[2];
        Tinter[key] = function(text) {
            if(text === undefined) {
                return `\x1b[1m\x1b[38;5;${degrade}m`;
            }
            return `\x1b[1m\x1b[38;5;${degrade}m${text}\x1b[0m`;
        };
        Tinter[key + "Bg"] = function(text) {
            if(text === undefined) {
                return `\x1b[1m\x1b[48;5;${degrade}m`;
            }
            return `\x1b[1m\x1b[48;5;${degrade}m${text}\x1b[0m`;
        };
    } else if(config.scheme === "16M") {
        Tinter[key] = function(text) {
            if(text === undefined) {
                return `\x1b[1m\x1b[38;2;${r};${g};${b}m`;
            }
            return `\x1b[1m\x1b[38;2;${r};${g};${b}m${text}\x1b[0m`;
        };
        Tinter[key + "Bg"] = function(text) {
            if(text === undefined) {
                return `\x1b[1m\x1b[48;2;${r};${g};${b}m`;
            }
            return `\x1b[1m\x1b[48;2;${r};${g};${b}m${text}\x1b[0m`;
        };
    } else {
        console.error(`Error: Unknown color scheme '${config.scheme}'.`);
    }
    Tinter.default = function(text) {return `\x1b[39m${text}`;};
    Tinter.defaultBg = function(text) {return `\x1b[49m${text}`;};
    Tinter.plain = Tinter.reset;
}
/* jshint ignore:end */

// Exports
module.exports = Tinter;
