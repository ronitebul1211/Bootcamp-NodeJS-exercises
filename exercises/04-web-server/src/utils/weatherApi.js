const request = require("request");

/** Get weather in location base on coordinate */
const getWeather = (latitude, longitude, callback) => {
   const url = `http://api.weatherstack.com/current?access_key=f9756d8566fed4bd9402a7d9d8fe5ad8&query=${latitude},${longitude}`;

   request({ url, json: true }, (error, res) => {
      if (error) {
         callback("Unable to connect to weather service", undefined);
      } else if (res.body.error) {
         callback("Unable to find location", undefined);
      } else {
         callback(undefined, `Current weather: ${res.body.current.temperature} Celsius degrees`);
      }
   });
};

module.exports = { getWeather };
