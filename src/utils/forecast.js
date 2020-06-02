const request = require('request')
// const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=17.38&lon=78.47&exclude={part}&appid=3b243e9ae49f0010bc00469fb423f96e&units=metric'
// request({url: url},(error, response) => {
//     const data = JSON.parse(response.body)
//     console.log(data.current)
// } )

// request({url: url, json: true}, (error, response) => {
//     if(error) {
//         console.log('Unable to connect to ')
//     } else if (response.body.cod) {
//         console.log('Location not found')
//     } else {
//         console.log(response.body.current.weather[0].description + ': It is currently ' + response.body.current.temp + ' Celcius')
//     }
// })

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude +'&lon=' + longitude + '&exclude={part}&appid=3b243e9ae49f0010bc00469fb423f96e&units=metric'

    request({url, json:true}, (error, {body})=> {  //url - short hand syntax, destructuring response with body
        if(error) {
            callback('Unable to connect', undefined)
        } else if(body.cod) {
            callback('Location not found', undefined)
        } else {
            // callback('undefined', temp = body.current.temp
            // callback('undefined', temp = body.current.temp, humidity = body.current.humidity
            callback( 'undefined', {
                temp: body.current.temp, 
                humidity: body.current.humidity
            }
             )
        }
    })
}

// forecast(17.38, 78.47, (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
// })

module.exports = forecast