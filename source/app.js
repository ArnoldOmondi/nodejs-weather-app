const path = require('path')
const hbs = require('hbs')

const forecast = require('./utilities/forecast')
const geocode = require('./utilities/geocode')

const express = require('express')
const port = process.env.PORT || 5500

const app = express()

//paths for express config.
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up the handle bar engine and the views location.
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDir))

//to display the hbs home page
app.get('/', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Arnold Omondi'
	})
})

//to display the hbs about page
app.get('/about', (req, res) => {
	res.render('about.hbs', {
		title: 'About Page',
		name: 'Arnold Omondi'
	})
})

//to display the hbs help page

app.get('/help', (req, res) => {
	res.render('help.hbs', {
		title: 'Help page',
		msg: 'we help you here',
		name: 'Arnold Omondi'
	})
})

//weather page.
app.get('/weather', (req, res) => {
	const address = req.query.address

	if (!address) {
		return res.send({
			error: 'You must provide an address!'
		})
	}

	geocode(address, (error, { lat, long, loc } = {}) => {
		if (error) {
			return res.send({ error })
		}

		forecast(lat, long, (error, forecastData) => {
			if (error) {
				return res.send({ error })
			}

			res.send({
				forecast: forecastData,
				location: loc,
				address
			})
		})
	})
})

//404 help error page.

app.get('/help/*', (req, res) => {
	res.render('help404', {
		title: 'Error: 404 page not found',
		msg: 'Help page does not exist',
		name: 'Arnold Omondi'
	})
})

//404 page.
app.get('/*', (req, res) => {
	res.render('404', {
		title: 'Error: 404 page not found',
		msg: 'Page does not exist',
		name: 'Arnold Omondi'
	})
})
//start server.
app.listen(port, error => {
	if (error) {
		return console.log(`Unable to connect to port ${port}`)
	}
	console.log(`Server is Up and Running on port ${port}`)
})
