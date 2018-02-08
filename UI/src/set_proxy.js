const fs = require('fs');

// read/process package.json
const file = './package.json';
let data = fs.readFileSync(file).toString();
let pkg = JSON.parse(data);

// at this point you should have access to your ENV vars
pkg.proxy = `${process.env.PROXY || "http://localhost:8000"}`;
console.log("Set package.json 'proxy' to ", pkg.proxy);

// the 2 enables pretty-printing and defines the number of spaces to use
fs.writeFileSync(file, JSON.stringify(pkg, null, 2));