const request = require('request')

const forecast = (lat, long, callback) => {
	const url = `https://api.darksky.net/forecast/a74006367cefce2b6055301db9c94b1d/${lat},${long}?units=si`

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to the weather-api', undefined)
		} else if (body.error) {
			callback('Error with the coordinate system', undefined)
		} else {
			const info = {
				temp: body.currently.temperature,
				prec: body.currently.precipProbability,
				daily: body.daily.data[0].summary
			}

			callback(
				undefined,
				`${info.daily} Its Currently ${info.temp} degrees out.There is a ${info.prec} % chance of rain`
			)
		}
	})
}

module.exports = forecast
