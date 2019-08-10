const request = require('request-promise');
const dotenv = require('dotenv');

dotenv.config();

const API_KEY = process.env.API_KEY;
class Weather {
  static retrieveByCity(city, callback) {
    request({
      uri: `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.API_KEY}&units=imperial`,
      json: true
    })
    .then(res => {
      callback(res)
    })
    .catch((err) => {
      console.log(err);
      callback({ error: 'Could not reach OpenWeatherMap API.' });
    });
  }
}

module.exports = Weather;
