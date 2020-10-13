const request = require("request");

/** Get location in world and return coordinate */
const geocode = (address, callback) => {
   const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address,
   )}.json?access_token=pk.eyJ1Ijoicm9uaXRlYnVsMTIxMSIsImEiOiJja2c2a3IwODQwMm1mMndwa2IyNDM2ZWp2In0.EnXemPEI-kVNUs68tXKK6Q&limit=1`;

   request({ url, json: true }, (error, res) => {
      if (error) {
         callback("Unable to connect to location service", undefined);
      } else if (res.body.features.length === 0) {
         callback("Unable to find location, try another search", undefined);
      } else {
         callback(undefined, {
            longitude: res.body.features[0].center[0],
            latitude: res.body.features[0].center[1],
            location: res.body.features[0].place_name,
         });
      }
   });
};

module.exports = { geocode };
