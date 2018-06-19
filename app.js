const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require("./weather");

const argv = yargs
    .options({
        address:{
            demand: true,
            alias: 'a',
            describe: 'Address to fetch the weather for',
            string: true
        },
        googlekey:{
            demand:true,
            alias: 'k',
            describe: 'Google locaiton API key, left off my GitHub',
            string: true
        },
        darkskykey:{
            demand:true,
            alias: 'd',
            describe: 'DarkSky.net forecast API key, left off my GitHub',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.a, argv.k, (errMsg, locResult) => {
    if (errMsg) {
        console.log(errMsg);
    }
    else {
        console.log(`Obtaining weather info for ${locResult.addr}`);
        weather.getWeather(locResult.lat, locResult.lng, argv.d, (errMsg, weatherResult) => {
            if (errMsg) {
                console.log(errMsg);
            } else {
                console.log(JSON.stringify('Weather info obtained:'));
                console.log(JSON.stringify(weatherResult, undefined, 2));
            }
        });
    }

});