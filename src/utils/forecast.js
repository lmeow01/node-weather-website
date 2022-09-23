const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9067fd59a31054138813a143292e008b&query=' + latitude + ',' + longitude
    // + '&units=f'

    request({url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather forecast services.', undefined)
        }
        else if (response.body.error){
            callback('Unable to obtain weather forecast of the location specified. Try another search.', undefined)
        }
        else {
            callback(undefined, response.body.current.weather_descriptions[0] +  ". It is currently " + response.body.current.temperature + " degrees out there. It feels like " + response.body.current.feelslike + " degrees out.\nThe humidity is " + response.body.current.humidity + "% period.")
        }

    })

}

module.exports = forecast