const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocodeApi = require("./utils/geocodeApi");
const weatherApi = require("./utils/weatherApi");

/**
 app.com - Domain
 app.com/help - Domain + Route

 Server: 

 # static files
   set public dir? express.static(publicDirPath)
   the only dir exposed by web server 
   static means directory not dynamic, files aren't going to change
   upload file by rout or specific name (index.html)

 # dynamic files:
   contains valued that going to change dynamically during runtime
   By default, Express expects your views to live in a views directory inside of your project root.
 */

const app = express();

//Define path for express config
let publicDirPath = path.join(__dirname, "../public");
let viewsDirPath = path.join(__dirname, "./templates/views");
let partialsDirPath = path.join(__dirname, "./templates/partials");
// Setup handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewsDirPath);
hbs.registerPartials(partialsDirPath);
//Setup static directory to serve
app.use(express.static(publicDirPath));

/**
 Configure what app should do when get "GET" request:
 response with html to render in browser or send json data
 
 app.get("route", (req, res) => {res.render/send(...)})
 # send(): js object (serialize to JSON auto) / raw html  
 # render(): dynamic html files

 send express html & styles & files assets: absolute path form root dir
 arg -> route string
 arg -> callback(req, res)
 */

app.get("", (req, res) => {
   // express get view, convert it to html and return as response, second arg-dynamic data to pass in
   res.render("index", {
      title: " weather app",
      name: "roni tebul",
   }); // auto search in view dir for file with identical name
});

app.get("/about", (req, res) => {
   res.render("about", {
      title: " weather app",
      name: "roni tebul",
   }); // auto search in view dir for file with identical name
});

app.get("/help", (req, res) => {
   res.render("help", {
      helpText: "it's snowing",
      title: "help page",
      name: "roni",
   });
});

app.get("/weather", (req, res) => {
   if (!req.query.address) {
      return res.send({
         error: "You must provide an address",
      });
   }
   geocodeApi.geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
         return res.send({ error });
      }
      weatherApi.getWeather(latitude, longitude, (error, forecastData) => {
         if (error) {
            return res.send({ error });
         }
         res.send({
            forecast: forecastData,
            location: location,
            address: req.query.address,
         });
      });
   });
});

app.get("/help/*", (req, res) => {
   res.render("404", {
      title: "404",
      name: "Roni Tebul",
      errorMessage: "Help article not find",
   });
});
app.get("*", (req, res) => {
   res.render("404", {
      title: "404",
      name: "Roni Tebul",
      errorMessage: "Pge not found",
   });
});

/** Start up server - listen specific port (running and processing request) - 3000 dev port*/
app.listen(3000, () => {
   console.log("server is up on port 3000");
});
