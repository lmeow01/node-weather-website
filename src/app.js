const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { resolveSoa } = require('dns')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express confog
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup statis directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Harry Chiew'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Harry Chiew'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: "Press button below for help",
        name: 'Harry Chiew'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide a valid address'
        })
    }

    address = req.query.address
    geocode(address, (error, {latitude, longitude, location} = {} ) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, foreCastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            return res.send({
                location,
                foreCastData,
                address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        message: 'Help article not found',
        title: '404',
        name: 'Harry Chiew'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        message: 'My 404 page',
        title: '404',
        name: 'Harry Chiew'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})