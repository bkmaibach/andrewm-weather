const request = require('request');

var geocodeAddress = function (address, key, callback){
    encodedAdr = encodeURIComponent(address);

    request({
        url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAdr}&key=${key}`,
        json: true
    }, (error, response, body) => {
        if(error){
            callback('Unable to retrieve location data from Google servers.', undefined);

        } else if (body.status === "ZERO_RESULTS") {
            callback('Unable to retrieve location data from Google servers.', undefined);
        } else if (body.status === "OK") {
            callback(undefined, {
                addr: body.results[0].formatted_address,
                lat: body.results[0].geometry.location.lat,
                lng: body.results[0].geometry.location.lng
            });
        }
    });
}

module.exports = {
    geocodeAddress
}