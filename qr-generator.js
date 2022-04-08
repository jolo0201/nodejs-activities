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


  


