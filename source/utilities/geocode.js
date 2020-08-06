const request = require('request')

const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoiYW5vbW9uZGkiLCJhIjoiY2s2N29oY2wxMDl6NzNkcGJuc2w5eTJxZCJ9.jTgi2V-qbM0QLo9dc6szFQ&limit=1`

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to the mapbox-api', undefined)
		} else if (body.features.length === 0) {
			callback('Unable to get location, please try another search', undefined)
		} else {
			const info = {
				lat: body.features[0].center[1],
				long: body.features[0].center[0],
				loc: body.features[0].place_name
			}

			callback(undefined, info)
		}
	})
}

module.exports = geocode
