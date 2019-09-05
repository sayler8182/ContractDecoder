const path = require("path");
const fs = require("fs");
const { Decoder } = require("./src/Decoder");

// start
const dirPath = path.join(__dirname, "input");
fs.readdir(dirPath, (error, files) => {
    if (error) { return console.error(error); }

    // scan files
    files = files.filter(f => f.includes(".json"));
    files.forEach((file) => {
        const Contract = require(`./input/${file}`);
        const abi = Contract.abi;
        const decoder = new Decoder(Contract.contractName, abi);

        // save output in file
        const output = decoder.getInterface();
        fs.writeFile(`./output/${Contract.contractName}.sol`, output, (error) => {
            if (error) { return console.error(error); }
        });

        // log output
        console.info(output);
    });
}); 