const geocodeApi = require("./utils/geocodeApi");
const weatherApi = require("./utils/weatherApi");

const address = process.argv[2];
if (!address) {
   console.log("please provide an address");
} else {
   geocodeApi.geocode(address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
         return console.log(error);
      }

      weatherApi.getWeather(latitude, longitude, (error, weatherData) => {
         if (error) {
            return console.log(error);
         }
         console.log(location);
         console.log(weatherData);
      });
   });
}
