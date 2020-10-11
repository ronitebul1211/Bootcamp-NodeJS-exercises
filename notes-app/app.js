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
