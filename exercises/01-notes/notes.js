const fs = require("fs");
const chalk = require("chalk");
const path = require("path");

//TODO - Refactoring separate ui communicate and app logic
//TODO - test separate files
//TODO - CLEAR
// const clearList = () => {
//    fs.writeFileSync("notes.json", "");
//    try {
//      const dataBuffer = fs.readFileSync("notes.json");
//      const dataJSON = dataBuffer.toString();
//      return JSON.parse(dataJSON);
//    } catch (e) {
//      return [];
//    }
//  };
const listNotes = () => {
   const notes = loadNotes();
   console.log(chalk.inverse("Your Notes"));
   notes.forEach((note) => {
      console.log(note.title);
   });
};

const readNote = (title) => {
   const notes = loadNotes();
   const note = notes.find((note) => title === note.title);
   if (note) {
      console.log(chalk.inverse(note.title));
      console.log(note.body);
   } else {
      console.log(chalk.red.inverse("Note not found"));
   }
};

/** Remove Note Data */
const removeNote = (title) => {
   const notes = loadNotes();
   const noteTeKeep = notes.filter((note) => title !== note.title);
   if (notes.length > noteTeKeep.length) {
      saveNotes(noteTeKeep);
      console.log(chalk.green.inverse("Note Removed"));
   } else {
      console.log(chalk.red.inverse("Note not found"));
   }
};

/** Add Note Data (in case of duplicate titles new note removed) */
const addNotes = (title, body) => {
   const notes = loadNotes();
   const duplicateNote = notes.find((note) => title === note.title);
   if (!duplicateNote) {
      notes.push({ title, body });
      saveNotes(notes);
      console.log(chalk.green.inverse("Note Added"));
   } else {
      console.log(chalk.red.inverse("Note not added - title taken"));
   }
};

/** Save notes array has json in file */
const saveNotes = (notes) => {
   const jsonData = JSON.stringify(notes);
   console.log(__dirname);
   fs.writeFileSync(path.resolve(__dirname, "notes.json"), jsonData);
};

/** get notes array */
const loadNotes = () => {
   try {
      const dataBuffer = fs.readFileSync(path.resolve(__dirname, "notes.json"));
      const dataJson = dataBuffer.toString();
      return JSON.parse(dataJson);
   } catch (error) {
      return [];
   }
};

module.exports = {
   listNotes: listNotes,
   addNotes: addNotes,
   removeNote: removeNote,
   readNote: readNote,
   loadNotes: loadNotes,
   saveNotes: saveNotes,
};
