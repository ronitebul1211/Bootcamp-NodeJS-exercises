const yargs = require("yargs");
const calc = require("./calc.js");

yargs.version("1.1.0");

yargs.command({
   command: "add",
   describe: "Add 2 numbers",
   builder: {
      num1: {
         describe: "number 1",
         demandOption: true,
         type: "number",
      },
      num2: {
         describe: "number 1",
         demandOption: true,
         type: "number",
      },
   },
   handler(argv) {
      calc.add(argv.num1, argv.num2);
   },
});

yargs.command({
   command: "sub",
   describe: "Subtract 2 numbers",
   builder: {
      num1: {
         describe: "number 1",
         demandOption: true,
         type: "number",
      },
      num2: {
         describe: "number 1",
         demandOption: true,
         type: "number",
      },
   },
   handler(argv) {
      calc.sub(argv.num1, argv.num2);
   },
});

yargs.command({
   command: "multiple",
   describe: "Multiple 2 numbers",
   builder: {
      num1: {
         describe: "number 1",
         demandOption: true,
         type: "number",
      },
      num2: {
         describe: "number 1",
         demandOption: true,
         type: "number",
      },
   },
   handler(argv) {
      calc.multiple(argv.num1, argv.num2);
   },
});
yargs.command({
   command: "pow",
   describe: "Number squared",
   builder: {
      num1: {
         describe: "number 1",
         demandOption: true,
         type: "number",
      },
   },
   handler(argv) {
      calc.pow(argv.num1);
   },
});

yargs.parse();
