import express from 'express'
import path from 'path'
import hbs from 'hbs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import geocode from './utils/geocode.js'
import forecast from './utils/forecast.js'

//Define paths for express config
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up static dir to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Jim Im',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Jacob Im',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpMessage: 'If you need any help email me at imjacob933@gmail.com',
    title: 'Help',
    name: 'Jacob Im',
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address){
    return res.send({
      error: 'Address must be provided'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if(error) {
      return res.send({ error })
    } 

    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send({ error })
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'Provide a search term',
    })
  }
  console.log(req.query.search)
  res.send({
    products: [],
  })
})

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: '404',
    name: 'Jacob Im',
    error: 'Help article not found',
  })
})

app.get('*', (req, res) => {
  //* means anything else that hasn't already been defined
  res.render('error', {
    title: '404',
    name: 'Jacob Im',
    error: 'Page not found',
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
