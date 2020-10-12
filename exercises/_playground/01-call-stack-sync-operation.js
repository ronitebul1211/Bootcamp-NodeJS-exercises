const printLocation = (locations) => {
   locations.forEach((location) => {
      console.log(location);
   });
};
const myLocation = ["Philly", "NYC"];

printLocation(myLocation);

/**
 script start execute:
 call stack:
 - main()

 line 8:
  call stack:
 - main()
 - printLocation([...])

 line 2:
  call stack:
 - main()
 - printLocation([...])
 - forEach(...)
 
 line 2:
  call stack:
 - main()
 - printLocation([...])
 - forEach(...)
 - anonymous("Philly")
 
 line 3:
  call stack:
 - main()
 - printLocation([...])
 - forEach(...)
 - anonymous("Philly")
 - console.log("Philly")

 line 2:
  call stack:
 - main()
 - printLocation([...])
 - forEach(...)
 - anonymous("NYC")
 
 line 3:
  call stack:
 - main()
 - printLocation([...])
 - forEach(...)
 - anonymous("NYC")
 - console.log("NYC")

 line 4:
  call stack:
 - main()
 - printLocation([...])

 line 5:
  call stack:
 - main()
 
 line 8:
  call stack:

 */
