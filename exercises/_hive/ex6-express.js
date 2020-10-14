const express = require("express");
const bodyParser = require("body-parser");
const ProductsList = require("./ProductsList").ProductsList;
const UsersList = require("./UsersList").UsersList;

const app = express();
app.use(bodyParser.json());

//DataModal
const productsList = new ProductsList();
const usersList = new UsersList();

//GET Products
app.get("/products", (req, res) => {
   res.send(productsList.getProducts());
});

//CREATE Product
app.post("/product", (req, res) => {
   const productData = req.body;
   if (productData.title && productData.price && Object.keys(productData).length === 2) {
      const newProduct = productsList.addProduct(productData.title, productData.price);
      res.status(200);
      res.send(newProduct);
   } else {
      throw new Error("Invalid product object: product should contain title and price properties");
   }
});

//GET Users
app.get("/users", (req, res) => {
   res.send(usersList.getUsers());
});

//CREATE
app.post("/user", (req, res) => {
   const userData = req.body;
   if (userData.name && userData.age && Object.keys(userData).length === 2) {
      const newUser = usersList.addUser(userData.name, userData.age);
      res.status(200);
      res.json(newUser);
   } else {
      throw new Error("Invalid user object: user should contain name and age properties");
   }
});

//UPDATE User
app.put("/user", (req, res) => {
   const userId = req.query.id;
   const userData = req.body;
   if (userData.name && userData.age && Object.keys(userData).length === 2) {
      const updatedUser = usersList.updateUser(userId, userData.name, userData.age);
      if (!(typeof updatedUser === "undefined")) {
         res.status(200);
         res.send(updatedUser);
      } else {
         throw new Error("ID not exist");
      }
   } else {
      throw new Error("Update with valid structure object container name, age properties");
   }
});

//DELETE
app.delete("/user", (req, res) => {
   const userId = req.query.id;
   let deletedUserId = usersList.deleteUser(userId);
   if (!(typeof deletedUserId === "undefined")) {
      res.status(200);
      res.send(`User with id:${deletedUserId} deleted`);
   } else {
      throw new Error("ID not exist");
   }
});

app.listen(3000, () => {
   console.log("server is up on port 3000");
});
