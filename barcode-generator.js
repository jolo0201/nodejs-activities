const prompt = require('prompt');
const JsBarcode = require('jsbarcode');
const { createCanvas,registerFont } = require('canvas');
const fs = require('fs');
registerFont('./FontFolder/Roboto-Regular.ttf', { family: 'Roboto' }); //register font for the barcode
const imgDirectory = "./img/";

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

