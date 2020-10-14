const http = require("http");
const ProductsList = require("./ProductsList").ProductsList;
const UsersList = require("./UsersList").UsersList;

//TODO - ERROR HANDLING! (IN ASYNC)

//Server config
const hostname = "localhost";
const port = 3000;

//DataModal
const productsList = new ProductsList();
const usersList = new UsersList();

//Server Config
const server = http.createServer((req, res) => {
   switch (req.method) {
      case "GET":
         handleGetRequest(req, res);
         break;
      case "POST":
         handlePostRequest(req, res);
         break;
      case "DELETE":
         handleDeleteRequest(req, res);
         break;
      case "PUT":
         handleUpdateRequest(req, res);
         break;
   }
});

//GET
const handleGetRequest = (req, res) => {
   if (req.url === "/products") {
      const productsListJson = JSON.stringify(productsList.getProducts());
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(productsListJson);
   }
   if (req.url === "/users") {
      const UsersListJson = JSON.stringify(usersList.getUsers());
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(UsersListJson);
   }
};

//CREATE
const handlePostRequest = (req, res) => {
   if (req.url === "/product") {
      parseBody(req, (productData) => {
         if (productData.title && productData.price && Object.keys(productData).length === 2) {
            const product = productsList.addProduct(productData.title, productData.price);
            const productJson = JSON.stringify(product);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(productJson);
         }
      });
   }

   if (req.url === "/user") {
      parseBody(req, (userData) => {
         if (userData.name && userData.age && Object.keys(userData).length === 2) {
            const user = usersList.addUser(userData.name, userData.age);
            const userJson = JSON.stringify(user);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(userJson);
         }
      });
   }
};
const handleDeleteRequest = (req, res) => {
   const url = new URL(req.url, `http://${req.headers.host}`);
   if (url.pathname === "/user") {
      const userId = url.searchParams.get("id");
      const deletedUserId = usersList.deleteUser(userId);
      if (!(typeof deletedUserId === "undefined")) {
         res.writeHead(200, { "Content-Type": "application/json" });
         res.end(`User with id:${deletedUserId} deleted`);
      } else {
         res.writeHead(500, { "Content-Type": "application/json" });
         res.end(`ID not exist`);
      }
   }
};

const handleUpdateRequest = (req, res) => {
   const url = new URL(req.url, `http://${req.headers.host}`);
   if (url.pathname === "/user") {
      const userId = url.searchParams.get("id");
      parseBody(req, (userData) => {
         if (userData.name && userData.age && Object.keys(userData).length === 2) {
            const updatedUser = usersList.updateUser(userId, userData.name, userData.age);
            if (!(typeof updatedUser === "undefined")) {
               res.writeHead(200, { "Content-Type": "application/json" });
               const updatedUserJson = JSON.stringify(updatedUser);
               res.end(updatedUserJson);
            } else {
               res.writeHead(500, { "Content-Type": "application/json" });
               res.end(`ID not exist`);
            }
         } else {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end("Update with valid structure object container name, age properties");
         }
      });
   }
};

server.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
});

//Body Parser
const parseBody = (req, callback) => {
   let body = "";
   req.on("data", (chunk) => {
      body += chunk.toString();
   });
   req.on("end", () => {
      const parsedBody = JSON.parse(body);
      callback(parsedBody);
   });
};
