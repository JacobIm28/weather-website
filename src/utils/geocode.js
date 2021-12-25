import request from 'request'

const geocode = (address, callback) => {
  //encodeURIComponent to allow for special char in address
  const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamFjb2JpbTI4IiwiYSI6ImNreGppd296ZTA3bTgycG13NzByYTFxNmgifQ.LwkWw4t8Pp1-KLbUsoGRdA&limit=1'

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services', undefined)
    } else if (body.features.length === 0) {
      callback('Location not found. try another search', undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name,
      })
    }
  })
}

export default geocode
