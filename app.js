const yargs = require('yargs');
const geocode = require('./geocode/geocode');

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

geocode.geocodeAddress(argv.a, argv.k, (errMsg, results) => {
    if (errMsg) { console.log(errMsg); }
    else {
        console.log(JSON.stringify(results, undefined, 2));
    }

});