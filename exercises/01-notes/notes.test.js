const notes = require("./notes.js");
const chalk = require("chalk");

describe("notes", () => {
   describe("loadNotes", () => {
      it("should return an empty array", () => {
         const excepted = [];
         const result = notes.loadNotes();
         expect(result).toEqual(excepted);
      });
   });
   describe("savesNotes", () => {
      it("should save passed in array", () => {
         const excepted = [
            { title: "Note 1", body: "body 1" },
            { title: "Note 2", body: "body 2" },
         ];
         notes.saveNotes(excepted);
         const result = notes.loadNotes();
         expect(result).toEqual(excepted);
      });
   });
   describe("addNote", () => {
      it("should add 2 note to notes array", () => {
         notes.addNotes("Note 3", "body 3");
         notes.addNotes("Note 4", "body 4");
         const excepted = [
            { title: "Note 1", body: "body 1" },
            { title: "Note 2", body: "body 2" },
            { title: "Note 3", body: "body 3" },
            { title: "Note 4", body: "body 4" },
         ];
         const result = notes.loadNotes();
         expect(result).toEqual(excepted);
      });
      it("should Not add duplicate node", () => {
         notes.addNotes("Note 2", "body 2");
         const excepted = [
            { title: "Note 1", body: "body 1" },
            { title: "Note 2", body: "body 2" },
            { title: "Note 3", body: "body 3" },
            { title: "Note 4", body: "body 4" },
         ];
         const result = notes.loadNotes();
         expect(result).toEqual(excepted);
      });
   });

   describe("removeNote", () => {
      it("should remove specific note from array", () => {
         notes.removeNote("Note 3");
         const excepted = [
            { title: "Note 1", body: "body 1" },
            { title: "Note 2", body: "body 2" },
            { title: "Note 4", body: "body 4" },
         ];
         const result = notes.loadNotes();
         expect(result).toEqual(excepted);
      });
      it('console.log with green bg "Note Removed"', () => {
         console.log = jest.fn();
         notes.removeNote("Note 4");

         expect(console.log).toHaveBeenCalledWith(chalk.green.inverse("Note Removed"));
      });
      it('console.log with red bg "Note Removed"', () => {
         console.log = jest.fn();
         notes.removeNote("Note 4");

         expect(console.log).toHaveBeenCalledWith(chalk.red.inverse("Note not found"));
      });
   });
   describe("readNote", () => {
      it("console.log with note title and note body", () => {
         console.log = jest.fn();
         notes.readNote("Note 1");

         expect(console.log).toHaveBeenCalledWith(chalk.inverse("Note 1"));
         expect(console.log).toHaveBeenCalledWith("body 1");
      });
      it("console.log with note not found bg red", () => {
         console.log = jest.fn();
         notes.readNote("Note 4");

         expect(console.log).toHaveBeenCalledWith(chalk.red.inverse("Note not found"));
      });
   });
   describe("listNotes", () => {
      it("console.log with 'Your Notes' title and list of note title", () => {
         console.log = jest.fn();
         notes.listNotes();

         expect(console.log).toHaveBeenCalledWith(chalk.inverse("Your Notes"));
         expect(console.log).toHaveBeenCalledWith("Note 1");
         expect(console.log).toHaveBeenCalledWith("Note 2");
      });
   });
});
