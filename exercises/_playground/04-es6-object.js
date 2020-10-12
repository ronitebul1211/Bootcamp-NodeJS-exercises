// Object property shorthand
const name = "Andrew";
const userAge = 27;

const user = {
   name,
   age: userAge,
   location: "Philadelphia",
};

console.log(user);

// Object destructuring
const product = {
   label: "Red notebook",
   price: 3,
   stock: 201,
   salePrice: undefined,
   rating: 4.2,
};

const { label: productLabel, stock, rating = 5 } = product; // change property name, default value if property not exist

// Object destructuring - function args...
// when destructuring function arg assign default value of an empty object
// why? destructuring undefined throw exception
const transaction = (type, { label, stock = 0 } = {}) => {
   console.log(type, label, stock);
};

transaction("order", product);
