const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const excelDir = "./ExcelFiles/";
const jsonDir = "./JsonSamples/";

let filenames = fs.readdirSync(jsonDir);
console.log("\nFilenames in directory:");
filenames.forEach((file) => {
    const _filePath = path.resolve(jsonDir, file); //path file
    const _filename = path.basename(_filePath); // file name
    console.log(_filename);
    
    var rawFile = fs.readFileSync(_filePath);//dir of your json file as param
    var raw = JSON.parse(rawFile);//parse json

    //Arrange object intro array by mapping
    var files  = [];
    for(let each in raw){
        files.push(raw[each])
        }  
       var obj = files.map((e) =>{
            return e
           });

    //convert from JSON to Excel file
    var newWB = xlsx.utils.book_new(); //Workbook
    var newWS = xlsx.utils.json_to_sheet(obj); //Worksheet
    xlsx.utils.book_append_sheet(newWB,newWS,_filename);//workbook name as filename
    xlsx.writeFile(newWB,excelDir + "generated_" + _filename.replace(".json",'').toLowerCase()+".xlsx");//save to ExcelFiles folder
    console.log(`Successfully converted JSON to excel with filename:${"generated_" + _filename.replace(".json",'').toLocaleLowerCase()+".xlsx"}.`);
});






