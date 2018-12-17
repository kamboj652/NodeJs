const request = require('request');



exports.test_get = (req, res, next) => {

    console.log('test');

    
    request({ url: 'https://maps.googleapis.com/maps/api/geocode/json?address="calle alejandro saint aubin 3"&key=AIzaSyC3xrLypr3cJUvIL9fRPnbunClSZXmvj5k', json: true }, 
    function (error, response, json) {
        if (error) {
            throw error;
        }
        console.log(json.results[0].address_components);
        res.status(200).json(json.results[0].address_components);
        
    });

}