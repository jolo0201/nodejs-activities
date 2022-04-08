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