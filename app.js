const request = require('request');
const yargs = require('yargs');

const argv = yargs
    .options({
        address:{
            demand: true,
            alias: 'a',
            describe: 'Address to fetch the weather for',
            string: true
        },
        key:{
            demand:true,
            alias: 'k',
            describe: 'Google locaiton API key, left off my GitHub',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

    console.log(argv.a);
    encodedAdr = encodeURIComponent(argv.a);

request({
    url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAdr}&key=${argv.k}`,
    json: true
}, (error, response, body) => {
    if(error){
        console.log("Unable to retrieve location data from Google servers.")
    } else if (body.status === "ZERO_RESULTS") {
        console.log(`Unable to find find address ${argv.a}`);
    } else if (body.status === "OK") {
        var address = body.results[0].formatted_address;
        var lat = body.results[0].geometry.location.lat;
        var lng = body.results[0].geometry.location.lng;
        console.log(address, lat, lng);
    }
});