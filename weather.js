request = require('request');

var getWeather = function(lat, lng, key, callback) {
    console.log(`Connecting to https://api.darksky.net/forecast/${key}/${lat},${lng}`)
    request({
        url : `https://api.darksky.net/forecast/${key}/${lat},${lng}`,
        json: true
        }, (error, response, body) => {
            if(error){
                callback('Unable to retrieve location data from Darksky servers.', undefined);
            } else if (body.error){
                callback('Location not recognized as valid by Darksky servers', undefined);
            } else {

                callback(undefined, {
                    summary: body.currently.summary,
                    temperature_current: ((body.currently.temperature - 32) / (1.8)).toFixed(2),
                    temperature_high: ((body.daily.data[0].temperatureHigh - 32) / (1.8)).toFixed(2)
                })
            }
        });
}

module.exports = {
    getWeather
};