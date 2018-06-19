const yargs = require('yargs');
const axios = require('axios');

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

    encodedAdr = encodeURIComponent(argv.address);

    var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAdr}&key=${argv.k}`;

    axios.get(geocodeUrl).then((response) => {
        if (response.data.status === 'ZERO_RESULTS'){
            throw new Error(`No results found for ${argv.address}`);
        }
        console.log(response.data.results[0].formatted_address);
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        var weatherUrl = `https://api.darksky.net/forecast/${argv.d}/${lat},${lng}`;
        return axios.get(weatherUrl);
    }).then((response) => {
            var temperature = response.data.currently.temperature;
            var apparentTemperature = response.data.currently.apparentTemperature;
            console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
        }).catch((error) => {
            if (error.code === 'ENOTFOUND'){
                console.log('Attempted to contact Google geocoding server... it didn\'t end well.');
            } else {
                console.log(error.message);
            }
        });