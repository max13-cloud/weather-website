//just 1 comment for git

const geocode = require('./utils/geocode.js');
const forecastApp = require('./utils/forcast.js');

const path = require('path') //core node module
const express = require('express')
const hbs = require('hbs')

const app = express()

//paths for express config
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setip static dir to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Maxime Nouaille',
        footer: 'By Maxime.N'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Maxime Nouaille',
        footer: 'By Maxime.N'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'Help me',
        title: 'About me',
        name: 'Maxime Nouaille',
        footer: 'By Maxime.N'
    })
})

/*app.get('', (req, res) => {
    res.send('<h1>Hello express!<h1>')
})*/

/*app.get('/help', (req, res) => {
    res.send([{
        name: 'Maxime'},
    {age: 27}] )
})

app.get('/about', (req, res) => {
    res.send('<h1>About<h1>')
})*/

app.get('/weather', (req, res) => {
    //console.log(req)
    if(!req.query.adress){
        return res.send({
            error: 'you must provide an adress'
        })
    }

    geocode(req.query.adress, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send(error)
        }
        console.log(latitude)
        forecastApp(latitude, longitude, (error, dataForecast) => {
          if(error){
            return res.send(error)
          }

          res.send({
            location: req.query.adress,
            forecast: dataForecast.weatherDesc,
            temperature: dataForecast.temperature,
            feelsLike: dataForecast.feelslike
            
        })
        //temperature: response.body.current.temperature,
        //feelsLike: response.body.current.feelslike,
        //weatherDesc:
          //console.log(location)
          //console.log(dataForecast)
        })
      })

   
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Maxime Nouaille',
        errorMessage: 'Article not found', 
        footer: 'By Maxime.N'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Maxime Nouaille',
        errorMessage: 'Page not found', 
        footer: 'By Maxime.N'
    })
})



app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})