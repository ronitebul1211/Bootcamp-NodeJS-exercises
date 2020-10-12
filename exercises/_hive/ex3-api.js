/**
 Choose one of these APIs from below and implement a fetching from them with:
• First task - fetch using request module (video 31,31)
• Second task - fetch using https module (video 42)
• Third task (bonus) - fetch using another library (e.g. node-fetch, r2,axios, etc.)
 */
const request = require("request");
const https = require("https");
const axios = require("axios");
const { get } = require("request");

/** 1. Fetch facts using request external module */
const getCatFacts1 = (factCount, callback) => {
   const url = `https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=${factCount}`;
   request({ url, json: true }, (error, response) => {
      if (error) {
         callback("Unable to connect cat fact service", undefined);
      } else if (response.body.length === 0) {
         callback("Unable to requested amount of facts", undefined);
      } else {
         const facts = response.body.map((fact) => fact.text);
         callback(undefined, facts);
      }
   });
};
getCatFacts1(5, (error, facts) => {
   console.log(facts);
   console.log(error);
});

/** 2. Fetch facts using https core module */
const getCatFacts2 = (factCount, callback) => {
   const url = `https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=${factCount}`;
   const request = https.request(url, (response) => {
      let data = "";
      response.on("data", (chunk) => {
         data = data + chunk.toString();
      });
      response.on("end", () => {
         const body = JSON.parse(data);
         if (body.length === 0) {
            callback("Unable to requested amount of facts", undefined);
         } else {
            const facts = body.map((fact) => fact.text);
            callback(undefined, facts);
         }
      });
   });
   request.on("error", (error) => {
      callback(error, undefined);
   });
   request.end();
};
getCatFacts2(5, (error, facts) => {
   console.log(facts);
   console.log(error);
});

/** 3. Fetch facts using axios external module */
const getCatFacts3 = (factCount, callback) => {
   const url = `https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=${factCount}`;
   axios
      .get(url)
      .then((response) => {
         if (response.data.length === 0) {
            callback("Unable to requested amount of facts", undefined);
         } else {
            const facts = response.data.map((fact) => fact.text);
            callback(undefined, facts);
         }
      })
      .catch((error) => {
         callback(error, undefined);
      });
};
getCatFacts3(5, (error, facts) => {
   console.log(facts);
   console.log(error);
});
