const express = require('express')
const cors = require("cors");
const {authenticate, register, nextstepreg} = require('./services');
const bodyParser = require("body-parser");
const multer = require('multer')
const port = 9000;
const app = express();

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb){
     cb(null, "IMAGE-" + Date.now() + file.originalname);
  }
  });
  
  // const fileFilter = (req, file, cb) => {
  //   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
  //     cb(null, true);
  //   } else {
  //     cb(null, false);
  //   }
  // };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 10
    },
    //fileFilter: fileFilter
  });

app.use(bodyParser.urlencoded({extended: false}))
app.use(cors());
app.get('/', /*urlencodedParser,*/ (req, res) => res.json('Hello World!'));
app.get('/auth', /*urlencodedParser,*/ (req, res) => res.sendFile(__dirname + "/index.html"))
app.get('/register', /*urlencodedParser,*/ (req, res) => res.sendFile(__dirname + "/index1.html")) //auth поменять на testAPI
app.get('/nextstepreg', /*urlencodedParser,*/ (req, res) => res.sendFile(__dirname + "/index1.html"))
app.post('/auth', /*urlencodedParser,*/authenticate);
app.post('/register', /*urlencodedParser,*/ register);
app.post('/nextstepreg',  /*urlencodedParser,*/upload.single('avatar'),nextstepreg )

app.listen(port, () => console.log(`Example app listening on port ${port}!`))