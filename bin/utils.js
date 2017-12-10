"use strict";
exports.__esModule = true;
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
exports.capitalizeFirstLetter = capitalizeFirstLetter;
function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
exports.random = random;
function kelvinToCelcius(kelvin) {
    return kelvin - 273.15;
}
exports.kelvinToCelcius = kelvinToCelcius;
function kelvinToFeels(kelvin) {
    var celcius = kelvinToCelcius(kelvin);
    if (celcius < 0) {
        return 'ice_ice_baby';
    }
    else if (celcius < 10) {
        return 'nippy';
    }
    else if (celcius < 15) {
        return 'meh';
    }
    else if (celcius < 20) {
        return 'warmish';
    }
    else if (celcius < 30) {
        return 'hot';
    }
    else {
        return 'MOLTEN_LAVA';
    }
}
exports.kelvinToFeels = kelvinToFeels;
function err(e) {
    return e;
}
exports.err = err;
//# sourceMappingURL=utils.js.map