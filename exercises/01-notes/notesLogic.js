class Note {
   constructor(title, body) {
      this.title = title;
      this.body = body;
   }
}

class NotesList {
   constructor(notes = []) {
      this.notes = notes;
   }

   addNote = (title, body) => {
      if (!(typeof title === "string")) {
         throw new Error("Invalid arg: title must be string type");
      }
      if (!(typeof body === "string")) {
         throw new Error("Invalid arg: body must be string type");
      }
      const duplicateNote = this.notes.find((note) => title === note.title);
      if (!duplicateNote) {
         this.notes.push(new Note(title, body));
         return this.notes;
      } else {
         throw Error("Note title exist");
      }
   };

   getNote = (title) => {
      if (!(typeof title === "string")) {
         throw new Error("Invalid arg: title must be string type");
      }
      const note = this.notes.find((note) => title === note.title);
      if (note) {
         return note;
      } else {
         throw Error("Note not exist");
      }
   };

   removeNote = (title) => {
      if (!(typeof title === "string")) {
         throw new Error("Invalid arg: title must be string type");
      }
      const notesToKeep = this.notes.filter((note) => title !== note.title);
      if (notes.length > noteTeKeep.length) {
         return notesToKeep;
      } else {
         throw Error("Note not exist");
      }
   };

   getNotesList = () => {
      return this.notes;
   };
}

//Export class
module.exports = {
   TasksList,
};
