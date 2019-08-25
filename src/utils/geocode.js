const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiYmFkYWwiLCJhIjoiY2p2eXZwN2R6MDV1cDQ5cjAxc2pvaDRrZSJ9.Q7ukcRHk9t5mjCox--bu_A&limit=1"
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback("Cannot connect to server",undefined)
        } else if (response.body.features == "") {
            callback("Unable to find location" , undefined);
        }else {
            callback(undefined , {
                longitude: response.body.features[0].center[0],
                latitude : response.body.features[0].center[1],
                location : response.body.features[0].place_name
            })

        }
    })
}
module.exports = geocode;