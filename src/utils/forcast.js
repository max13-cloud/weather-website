const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {

  //http://api.weatherstack.com/current?access_key=709a573f21cbd627bacafcf46da109f1&query=37.8267,-122.4233
  //const urlForCord = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoibW5vdWFpbGwiLCJhIjoiY2tweTlld2hsMDVtaTJvcnJicjV0YTJuZSJ9.fswXKbkO5thOh1cmTOhmfA&limit=1'
  const url = 'http://api.weatherstack.com/current?access_key=709a573f21cbd627bacafcf46da109f1&query=' + latitude + ',' + longitude
  request(url, {json: true, proxy: 'http://proxy-fr-croissy:8080/'}, (error, response) => {
  //request(url, {json: true }, (error, response) => {

    if (error) {
      callback('Unable to connect to weatherstack services!', undefined)
    } else if (response.body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, {
        temperature: response.body.current.temperature,
        feelsLike: response.body.current.feelslike,
        weatherDesc: response.body.current.weather_descriptions[0]
      })
    }
  })
}

module.exports = forecast