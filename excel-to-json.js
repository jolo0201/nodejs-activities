const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const path = require('path');
 
const excelDir = "./ExcelFiles";
const jsonDir = "./ConvertedJsonFiles/";

let filenames = fs.readdirSync(excelDir);
  
console.log("\nFilenames in directory:");
filenames.forEach((file) => {
    const _file = path.resolve(excelDir, file); //path file
    const _filename = path.basename(_file); // file name
    console.log(_filename);

    var result = excelToJson({
        source: fs.readFileSync(_file) // fs.readFileSync return a Buffer
    });

    //convert from excel to JSON file
    const jsonString = JSON.stringify(result, null, 2)  //convert to json
    fs.writeFile(jsonDir + "generated_" +_filename.replace('.xlsx','') +'.json', jsonString, err => {
        err ? console.log('Error converting file.', err) : console.log(`Successfully converted excel file to JSON with filename:  ${"generated_" +_filename.replace('.xlsx','').toLowerCase() +'.json'}.`)
    });
});




