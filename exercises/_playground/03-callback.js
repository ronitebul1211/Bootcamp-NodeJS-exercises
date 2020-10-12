const geocode = (address, callback) => {
   setTimeout(() => {
      const data = {
         latitude: 0,
         longitude: 0,
      };
      callback(data);
   }, 2000);
};

geocode("Eilat", (data) => {
   console.log(data);
});

/**
 geocode function contain code execute in async way - 
 line 3-7 will execute in delay of 2 seconds from the moment geocode invoked
 geocode caller pass in callback function to manipulate data when available.

 function contain sync code =>  return
 function contain Async code =>  callback function

 */
