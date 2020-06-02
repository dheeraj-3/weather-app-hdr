const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const forecast = require('./utils/forecast')
const geoCode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// console.log(path.join(__dirname, '..'))
// console.log(path.join(__dirname, '../public'))

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../')
const viewspath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('views', viewspath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'JSR!'
        
    })
}) 

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'JSR!'
        
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        data: 'qqqqq',
        title: 'help',
        name: 'JSR!'
    })
})



// app.get('',(req, res) => {   //Never going to be executed becuase of publicDirectoryPath
//     res.send('<h1>Hello, express!</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send('Help page')
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>Title</h1')
// })

app.get('/weather',(req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'enter address'
        })       
    }

    geoCode(req.query.address, (error, {latitude, longitude, placeName} = {}) => {  //destructuring geoCodedata object
        if(error) {
            // return console.log('Error', error)
            return res.send({
                error: 'error'
            })
        }     
        // console.log('Data', geoCodedata) 
        forecast(latitude, longitude, (error, foreCastdata) => {
            // if(error) {
            //     // return console.log('Error', error)
            //     return res.send({
            //         error: 'error'
            //     })
            // }
            
            // console.log('Latitude: ' + latitude + ' Longitude: ' + longitude)
            // console.log(foreCastdata)
            res.send({
                latitude,
                longitude,
                //placeName,
                address: req.query.address,
                // temp,
                // humidity
                temp: foreCastdata.temp,
                humidity: foreCastdata.humidity
            })

            })      
        })


    // res.send({
    //     address: req.query.address
    // })
    
})

app.get('/products', (req, res) => {
    if(!req.query.search) {             //search is the input provided via browser
        return res.send({
            error: 'blah'
        })
    } 
    // console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error!',
        name: 'JSR!',
        errorMessage: 'Help article not found - 404 error!'

    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error!',
        name: 'JSR!',
        errorMessage: 'Vanilla 404 error!'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})








