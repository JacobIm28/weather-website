import request from 'request'

const forecast = (lat, long, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=8066b3d52e6dd5eb26b522971aac7e86&query=' + lat + ',' + long + '&units=f'

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service', undefined)
    } else if (body.error) {
      callback('Could not reach API', undefined)
      console.log(body.error)
    } else {
      callback(undefined, 'It is currently ' + body.current.temperature + '. It feels like ' + body.current.feelslike + '. The current visibility is ' + body.current.visibility + '.')
    }
  })
}

export default forecast 
