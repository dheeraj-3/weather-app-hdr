const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +  address + '.json?access_token=pk.eyJ1IjoiamFpc3JpcmFtIiwiYSI6ImNrYXBlNDY4aTF4N3Eyc3A2b2JoNm9uejkifQ.jdhsT7U0eE27mT5Y8Aa6AA&limit=1'

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('General error', undefined)
        } else if(body.features.length === 0) {
            callback('Wrong location details', undefined)
        } else if(body.message) {
            callback('No location details', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                placeName: body.features[0].place_name
            })
        }
    })
}


module.exports = geoCode