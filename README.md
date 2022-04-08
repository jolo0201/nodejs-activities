# Node JS Activities
Multiple NodeJS activities for Solutions Architect training.


### Before you start
Install all node modules in order for them to work.

```
npm i convert-excel-to-json xlsx jimp qrcode prompt jsbarcode canvas movie-list-node
```

## Excel To JSON

Convert all Excel Files from a folder to JSON file. Copy excel files to **ExcelFiles** folder. JSON files will be saved on **ConvertedJsonFiles** folder.

### Running the script

```
node excel-to-json.js
```

## JSON to Excel

Convert all JSON Files from a folder to Excel file. Copy JSON files to **JsonSamples** folder. Excel files will be saved on **ExcelFiles** folder.

### Running the script

```
node json-to-excel.js
```

## Image Morph

Add a background image to a PNG file and saving it on a directory using *Jimp*.

### Running the script

```
node image-morph.js
```
> Image are static. Change them on the code to generate a result.

## QR Generator

This will generate a QR code of a website according to the user input and saving it as a PNG file.

### Running the script

```
node qr-generator.js
```

## Barcode Generator

This will generate a barcode of a product code according to the user input and saving it as a PNG file.

### Running the script

```
node barcode-generator.js
```

## Movie Search

This will generate an excel file from the movies or series searched using https://api.themoviedb.org API.
> Note: Generate you own API key.

### Running the script

```
node movie.js
```
