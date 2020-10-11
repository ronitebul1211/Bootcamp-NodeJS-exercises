const fs = require("fs");

/** Book Exercise */
// const book = {
//    title: "Harry Potter",
//    author: "J.K Rolling",
// };

// const bookJsonString = JSON.stringify(book);
// fs.writeFileSync("1-json.json", bookJsonString);

// const dataBuffer = fs.readFileSync("1-json.json");
// const jsonData = dataBuffer.toString();
// const data = JSON.parse(jsonData);
// console.log(data);

/** Andrew Exercise */
const dataBuffer = fs.readFileSync("1-json.json");
let jsonData = dataBuffer.toString();
const user = JSON.parse(jsonData);
user.name = "Roni";

const userData = JSON.stringify(user);
fs.writeFileSync("1-json.json", userData);
