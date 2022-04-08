# Node JS Activities
Multiple NodeJS activities for Solutions Architect training.

### Before you start
Install all node modules in order for them to work.

```
npm i convert-excel-to-json xlsx jimp qrcode prompt jsbarcode canvas movie-list-node
```

## Excel To JSON

Convert all Excel Files in the folder to JSON. Copy excel files to ExcelFiles folder. Output will be saved in ConvertedJsonFiles folder.

### Running the application

```
node excel-to-json.js
```

## JSON to Excel

Convert all JSON Files in the folder to Excel. Copy JSON files to JsonSamples folder. Output will be saved in ExcelFiles folder.

### Running the application

```
node json-to-excel.js
```

## Image Morph

Add a background image to a PNG file and saving it on a directory.

### Running the application

```
node image-morph.js
```
> Image are static. change them on the code to create a result.

## QR Generator

Generate a QR code of a website based on the user input and produce an image on disk.

### Running the application

```
node qr-generator.js
```

## Barcode Generator

Generate a barcode of an product code based on the user input and produce an image on disk.

### Running the application

```
node barcode-generator.js
```

## Movie Search

Generate an excel file for the movies or series searched using  https://api.themoviedb.org API.
> Note: Generate you own API key.

### Running the application

```
node movie.js
```
