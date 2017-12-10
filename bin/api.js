"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var Utils = require("./utils");
var fs = require("fs");
var API_BASE = 'http://api.openweathermap.org/data/2.5';
var url = function (u, k) { return API_BASE + "/" + u + "&APPID=" + k; };
function getLatLong() {
    return axios_1["default"].get('http://freegeoip.net/json/').then(function (response) {
        return [response.data.latitude, response.data.longitude];
    });
}
exports.getLatLong = getLatLong;
function storeApiKey(key) {
    return new Promise(function (resolve, reject) {
        if (key) {
            try {
                fs.writeFileSync('./key.txt', key);
                var k = fs.readFileSync('./key.txt');
                if (k) {
                    resolve(key.toString());
                }
                else {
                    reject(Utils.err({
                        code: 400,
                        type: 'invalid_key'
                    }));
                }
                resolve();
            }
            catch (e) {
                reject(Utils.err({
                    code: 400,
                    type: 'invalid_key'
                }));
            }
        }
        else {
            reject(Utils.err({
                code: 400,
                type: 'invalid_key'
            }));
        }
    });
}
exports.storeApiKey = storeApiKey;
function getApiKey() {
    return new Promise(function (resolve, reject) {
        try {
            var key = fs.readFileSync('./key.txt');
            if (key) {
                resolve(key.toString());
            }
            else {
                reject(Utils.err({
                    code: 400,
                    type: 'no_api_key'
                }));
            }
        }
        catch (e) {
            reject(Utils.err({
                code: 400,
                type: 'no_api_key'
            }));
        }
    });
}
exports.getApiKey = getApiKey;
function getWeather(latlong) {
    return getApiKey()
        .then(function (key) {
        return axios_1["default"]
            .get(url("/weather?lat=" + latlong[0] + "&lon=" + latlong[1], key))
            .then(function (resp) { return resp.data; })["catch"](function (err) {
            return Utils.err({
                code: 400,
                type: 'invalid_key'
            });
        });
    });
}
exports.getWeather = getWeather;
//# sourceMappingURL=api.js.map