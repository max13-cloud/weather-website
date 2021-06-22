const request = require('postman-request');

const geocode = (adress, callback) => {
  const urlForCord = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoibW5vdWFpbGwiLCJhIjoiY2tweTlld2hsMDVtaTJvcnJicjV0YTJuZSJ9.fswXKbkO5thOh1cmTOhmfA&limit=1'
  //request({url: urlForCord, json: true} , (error, response) => {
  //or Object property shorthand
  //request({urlForCord, json: true} , (error, response) => {
  // AND destructuring 
  console.log(urlForCord)
  request(urlForCord, {json: true} , (error, {body}) => {
  //const test = request(urlForCord, { json: true }, (error, { body }) => {
    //console.log(body.features)
    if (error) {
      //console.log(error)
      callback('Unable to connect to location services!', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location', undefined)
    } else {
     // console.log(body)
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })

    }
  });

}

module.exports = geocode