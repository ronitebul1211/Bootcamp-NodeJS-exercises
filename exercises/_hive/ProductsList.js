class ProductsList {
   constructor() {
      this.list = [];
      this.idCounter = 0;
   }

   addProduct = (title, price) => {
      const product = { id: this.idCounter, title, price };
      this.list.push(product);
      this.idCounter++;
      return product;
   };

   getProducts = () => this.list;
}

module.exports = { ProductsList };
