const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js");

yargs.version("1.1.0");

/** Get from user Task{ title: "str", body: "str" } and add it to notes */
yargs.command({
   command: "add",
   describe: "Add a new note",
   builder: {
      title: {
         describe: "Note Title",
         demandOption: true,
         type: "string",
      },
      body: {
         describe: "Note Body",
         demandOption: true,
         type: "string",
      },
   },
   handler(argv) {
      notes.addNotes(argv.title, argv.body);
      /**
       try {
         const notesArray = addNote("note 1", "note body 1") -> add or throw if exist
         writeToFile(notesArray)  -> add or throw if didn't write 

         log -> "note add"
       } catch(e) {
         error type exist ->  log -> "note exist"
         error type cant write ->  keep throw
       }
      
       */
   },
});

/** Get from user Task title to remove from notes */
yargs.command({
   command: "remove",
   describe: "remove a note",
   builder: {
      title: {
         describe: "Note Title",
         demandOption: true,
         type: "string",
      },
   },
   handler(argv) {
      notes.removeNote(argv.title);
   },
});

/** List notes on console */
yargs.command({
   command: "list",
   describe: "list your notes",
   builder: {
      title: {
         describe: "Note Title",
         demandOption: true,
         type: "string",
      },
   },
   handler() {
      notes.listNotes();
   },
});

/** Get from user note title and return note body */
yargs.command({
   command: "read",
   describe: "read a note",
   handler(argv) {
      notes.readNote(argv.title);
   },
});

yargs.parse();
