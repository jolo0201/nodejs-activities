# Node JS Activities
Multiple activities for Node JS training.

This project includes the following activities:
- Excel to JSON Converter
- JSON to Excel Converter
- Image Morph
- QR Code Generator
- Barcode Generator
- Movie Search

### Before you start
NodeJS version must be 

```
>= v16
```

Install all node modules required to start.

```
npm i convert-excel-to-json xlsx jimp qrcode prompt jsbarcode canvas movie-list-node
```

## 1. Excel To JSON

Convert all Excel Files from a folder to JSON file. Copy excel files to **ExcelFiles** folder. JSON files will be saved on **ConvertedJsonFiles** folder.

### Code
This code will read all excel files from ExcelFiles folder and convert each one of them to JSON files.

```
filenames.forEach((file) => {
    const _file = path.resolve(excelDir, file); //path file
    const _filename = path.basename(_file); // file name

    var result = excelToJson({
        source: fs.readFileSync(_file) // fs.readFileSync return a Buffer
    });

    //convert from excel to JSON file
    const jsonString = JSON.stringify(result, null, 2)  //convert to json
    fs.writeFile(jsonDir + "generated_" +_filename.replace('.xlsx','') +'.json', jsonString, err => {
        err ? console.log('Error converting file.', err) : console.log(`Successfully converted excel file to JSON with filename:  ${"generated_"     +_filename.replace('.xlsx','').toLowerCase() +'.json'}.`)
    });
});
```

### Running the script

```
node excel-to-json.js
```

## 2. JSON to Excel

Convert all JSON Files from a folder to Excel file. Copy JSON files to **JsonSamples** folder. Excel files will be saved on **ExcelFiles** folder.

### Code
Same with the Excel to JSON activity, this code will read all JSON files from JsonSamples folder and convert each one of them to Excel files.

```
filenames.forEach((file) => {
    const _filePath = path.resolve(jsonDir, file); //path file
    const _filename = path.basename(_filePath); // file name
    
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
```

### Running the script

```
node json-to-excel.js
```

## 3. Image Morph

Add a background image to a PNG file and saving it on a directory using *Jimp*.

### Code
This code will combine 2 images, a background JPEG file and a PNG file.

```
var Jimp = require('jimp');

Promise.all([
    //read images
    Jimp.read("./img/bg.jpg"),
    Jimp.read("./img/pngfile.png")
]).then(function (results) {
    results[0].composite(results[1], 0, 0)                          
    .write("./img/generated_img.png"); 
    console.log("Successfully generated image.");
}).catch(function (err) {
    console.error(err);
})
```

### Running the script

```
node image-morph.js
```
> Image are static. Change them on the code to generate a result.

## 4. QR Generator
This will generate a QR code of a website according to the user input and saving it as a PNG file.

### Code
This code will create a QR code from the user input site/text using *Prompt* and saving it to a drive.

```
const qrcode = require('qrcode');
const prompt = require('prompt');
const imgdirectory = "./img/";

prompt.start();
prompt.get(['site', 'filename'], function (err,result) {
  qrcode.toFile(imgdirectory+`${result.filename}.png`, result.site, {
      color: {
        dark: '#000000', //qr color
        light: '#ffffff' //background color
      }
    }, function (err) {
      err ? console.log(err) :
      console.log('Successfully generated site QR code.')
    })
});
```

### Running the script

```
node qr-generator.js
```

## 5. Barcode Generator

This will generate a barcode of a product code according to the user input and saving it as a PNG file.

### Code
This code will create a barcode code using *Canvas* from the product code input using *Prompt* and saving it to a drive.

```
prompt.start();
prompt.get(['productID', 'filename'], function (err,result) {
    err ? console.log(err) :
    generateCode(result.productID,result.filename)
});

function generateCode(productID,filename){
    //canvas property
    var canvas = createCanvas(200,200);
    var ctx = canvas.getContext('2d');
    ctx.font = '12px Roboto Regular'; //font from register font
    ctx.fillText(productID, 50, 100);
    // Draw line under text
    var text = ctx.measureText(productID)
    ctx.strokeStyle = 'rgba(0,0,0,0.5)'
    ctx.beginPath()
    ctx.lineTo(50, 102)
    ctx.lineTo(50 + text.width, 102)
    ctx.stroke()
    canvas.text = productID;
    JsBarcode(canvas, productID);

    //create image stream
    const out = fs.createWriteStream(imgDirectory+`${filename.toLowerCase()}.png`);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () =>  console.log(`The barcode was created with filename: ${filename.toLowerCase()}.png`))
}
```

### Running the script

```
node barcode-generator.js
```

## 6. Movie Search

This will generate an excel file from the movies or series searched using https://api.themoviedb.org API.
> Note: Generate your own API key.

### Code
Searches a movie or series data from an input in the console.

```
const { getMovieList } = require('movie-list-node');
const prompt = require('prompt');

prompt.start();
prompt.get(['MovieName'], function (err,result) {
    err ? console.log(err) :
    getMovieList(result.MovieName);
});
```

This is the where you input you API Key and the method that create an excel file from the search.

```
const axios = require("axios");
const xlsx = require("xlsx");
const API_KEY = INPUT_YOUR_API_KEY_HERE;
const excel_dir = "./ExcelFiles/";
var raw;
module.exports.getMovieList = async function (movieOrSeriesName){
   
    var options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/movie?api_key='+API_KEY+'&query='+movieOrSeriesName
      };

    await axios.request(options).then(function (response) {
       //stringify
       raw = JSON.stringify(response.data.results);
       var files  = []; //declare array
       var obj = JSON.parse(raw); //Parse Json first before mapping
       //Arrange object intro array by mapping
       for(var i in obj)
       files.push(obj[i]);
   
       var newWB = xlsx.utils.book_new(); //Workbook
       var newWS = xlsx.utils.json_to_sheet(files); //Worksheet
       xlsx.utils.book_append_sheet(newWB,newWS,movieOrSeriesName);//workbook name as filename
       xlsx.writeFile(newWB,excel_dir + movieOrSeriesName+ "_list.xlsx");//save to ExcelFiles folder
       console.log("Successfully converted movie data to excel.");
    }).catch(function (error) {
        console.error(error);
    });
};
```

### Running the script

```
node movie.js
```
