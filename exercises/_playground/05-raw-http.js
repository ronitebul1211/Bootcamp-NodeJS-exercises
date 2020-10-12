const http = require("http");

const url = "http://api.weatherstack.com/current?access_key=f9756d8566fed4bd9402a7d9d8fe5ad8&query=40,-75";

//Request definition
const request = http.request(url, (response) => {
   let data = "";
   response.on("data", (chunk) => {
      // on event of receiving data (buffer) convert to string and concat with old data (once or multiple)...
      data = data + chunk.toString();
   });
   response.on("end", () => {
      const body = JSON.parse(data); // end event -> finish get data, parse and log
      console.log(body);
   });
});

// Listen to error event
request.on("error", (error) => {
   console.log("An error", error);
});

//Run request
request.end();
