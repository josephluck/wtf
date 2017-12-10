"use strict";
exports.__esModule = true;
var chalk_1 = require("chalk");
var dates = require("date-fns");
var utils = require("./utils");
var emojis = {
    cloud: '☁️',
    fog: '🌁',
    sun_with_cloud: '⛅',
    sun: '☀️',
    rain_with_cloud: '🌧️',
    rain_with_sun_and_cloud: '🌦️',
    thunder: '⚡',
    snow: '❄️',
    wind: '💨',
    umbrella: '☂️',
    sunnies: '🕶️',
    teeshirt: '👕',
    skiis: '⛷️'
};
function iceIceBaby() {
    return utils.random([
        "Don't even bother heading out today. It's 'effing freezing.",
        "You ain't no polar bear, bro. Stay indoors.",
        "Your outies gonna turn in to an innie today...",
        "Grab your " + emojis.skiis + ", you're gonna need 'em",
    ]);
}
exports.iceIceBaby = iceIceBaby;
function nippy() {
    return utils.random([
        "It's a 'lil nippy today.",
        "Grab your coat and scarf today.",
        "It's looking a 'lil brisk today.",
    ]);
}
exports.nippy = nippy;
function meh() {
    return utils.random([
        "Meh. Just meh...",
        "Okay, I 'spose.",
        "Neither here nor there today.",
    ]);
}
exports.meh = meh;
function warmish() {
    return utils.random([
        "Luke warm today. Hey Luke!",
        "Probably t-shirt & shorts.",
        "Get 'dem legs out.",
    ]);
}
exports.warmish = warmish;
function hot() {
    return utils.random([
        "Get your tan on bro.",
        "Factor 35, yo.",
        "Get 'dem " + emojis.sunnies + " out!",
    ]);
}
exports.hot = hot;
function moltenLava() {
    return utils.random([
        "OWCH, MY 'EFFIN EYES ARE MELTING!",
        "You'll look like a lobster if you head out today.",
        "GET THAT 'EFFIN AC ON NOW!",
    ]);
}
exports.moltenLava = moltenLava;
function feels(feels) {
    switch (feels) {
        case 'ice_ice_baby':
            return iceIceBaby();
        case 'nippy':
            return nippy();
        case 'meh':
            return meh();
        case 'warmish':
            return warmish();
        case 'hot':
            return hot();
        case 'MOLTEN_LAVA':
            return moltenLava();
        default:
            return '';
    }
}
exports.feels = feels;
function highsAndLows(temps) {
    return "Highs of " + utils.kelvinToCelcius(temps.temp_max) + "\u00B0C, lows of " + utils.kelvinToCelcius(temps.temp_min) + "\u00B0C.";
}
exports.highsAndLows = highsAndLows;
function title() {
    return chalk_1["default"].whiteBright.underline.bold("What's the forecast?");
}
exports.title = title;
function subheading(location) {
    var now = dates.format(new Date(), 'h:ma, dddd Do MMMM YYYY');
    return chalk_1["default"].italic.grey(location + ", " + now);
}
exports.subheading = subheading;
//# sourceMappingURL=messages.js.map