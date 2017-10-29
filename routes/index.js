var express = require('express');
var router = express.Router();
var urlencode = require('urlencode');
var request = require('request');
var fs = require('fs');
const FaceApi = require('node-mscs-face');
var faceApi = new FaceApi('585a42cc26344ab799f9433c30789442', 'SEA');

var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data


/* GET home page. */
router.get('/', function (req, res, next) {
  viewFile(req, res, 'main');
});
router.get('/upload', function (req, res, next) {
  viewFile(req, res, 'upload');
});
router.get('/tag', function (req, res, next) {
  viewFile(req, res, 'tag');
});
router.get('/dashboard', function(req, res, next){
  viewFile(req, res, 'dashboard');
});

router.post('/rec', upload.none(), function (req, res, next) {
  // https://eastasia.api.cognitive.microsoft.com/face/v1.0/detect
  var imageBuffer = fs.readFile(`${__dirname}/../public/${req.body.src}`, function (err, data) {
    if (err) throw err;
    faceApi.detect(data)
      .then((faceInfo) => {
        res.send(faceInfo);
      })
      .catch((err) => {
        // If no faces are detected, an error will be returned
        // An error can occur too if an incorrect/invalid Face API subscription key or any other incorrect parameters is provided. 
        // For more information on the kind of errors that Microsoft's Face API returns, please refer to https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395236
        console.log(err);
        res.send(err);
      });
  });

});

var viewFile = function (req, res, filename, param) {
  // console.log(param);
  var fullUrl = req.protocol + '://' + req.get('host') + req.path;
  res.render(filename, {
    title: 'knowkid',
    filename: filename,
    url: fullUrl,
    encodedUrl: urlencode(fullUrl),
    req: req,
    param
  });

}

module.exports = router;
