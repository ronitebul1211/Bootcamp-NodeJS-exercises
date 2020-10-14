const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

//TODO: septate logic of server behavior, data

/*********************************************************   Products   **************************************************************************** */
const products = [];
let productIdCounter = 0;

//GET
app.get("/products", (req, res) => {
   res.send(products);
});

//CREATE
app.post("/product", (req, res) => {
   const productData = req.body;
   if (productData.title && productData.price && Object.keys(productData).length === 2) {
      const newProduct = {
         id: productIdCounter,
         title: productData.title,
         price: productData.price,
      };
      productIdCounter++;
      products.push(newProduct);
      res.status(200);
      res.json(newProduct);
   } else {
      throw new Error("Invalid product object: product should contain title and price properties");
   }
});

/*********************************************************   Users   **************************************************************************** */
const users = [];
let userIdCounter = 0;

//GET
app.get("/users", (req, res) => {
   res.send(users);
});

//UPDATE
app.put("/user", (req, res) => {
   const userId = req.query.id;
   const userData = req.body;
   if (userData.name || userData.age) {
      let userIndex = users.findIndex((user) => parseInt(userId) === user.id);
      if (userIndex === -1) {
         throw new Error(`User id:${userId} is not exist`);
      } else {
         userData.name && (users[userIndex].name = userData.name);
         userData.age && (users[userIndex].age = userData.age);
         res.status(200);
         res.send(users[userIndex]);
      }
   }
});

//DELETE
app.delete("/user", (req, res) => {
   const userId = req.query.id;
   let userIndex = users.findIndex((user) => parseInt(userId) === user.id);

   if (userIndex === -1) {
      throw new Error(`User id:${userId} is not exist`);
   } else {
      const deletedUser = users.splice(userIndex, 1);
      res.status(200);
      res.send(`User with id:${deletedUser[0].id} deleted`);
   }
});

//CREATE
app.post("/user", (req, res) => {
   const userData = req.body;
   if (userData.name && userData.age && Object.keys(userData).length === 2) {
      const newUser = {
         id: userIdCounter,
         name: userData.name,
         age: userData.age,
      };
      userIdCounter++;
      users.push(newUser);
      res.status(200);
      res.json(newUser);
   } else {
      throw new Error("Invalid user object: user should contain name and age properties");
   }
});

app.listen(3000, () => {
   console.log("server is up on port 3000");
});
