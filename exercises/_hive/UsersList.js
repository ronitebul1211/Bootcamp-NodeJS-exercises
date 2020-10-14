class UsersList {
   constructor() {
      this.list = [];
      this.idCounter = 0;
   }

   addUser = (name, age) => {
      const newUser = { id: this.idCounter, name, age };
      this.list.push(newUser);
      this.idCounter++;
      return newUser;
   };

   deleteUser = (userId) => {
      let userIndex = this.list.findIndex((user) => user.id === parseInt(userId));
      if (!(userIndex === -1)) {
         const deletedUser = this.list.splice(userIndex, 1)[0];
         return deletedUser.id;
      }
   };

   updateUser = (userId, name, age) => {
      let userIndex = this.list.findIndex((user) => user.id === parseInt(userId));
      if (!(userIndex === -1)) {
         name && (this.list[userIndex].name = name);
         age && (this.list[userIndex].age = age);
      }
      return this.list[userIndex];
   };

   getUsers = () => this.list;
}

module.exports = { UsersList };
