const express = require('express')
const cors = require("cors");
const {authenticate, register, nextstepreg, getProfile, getAnotherProfile} = require('./services');
const bodyParser = require("body-parser");
const multer = require('multer')
const port = 9000;
const app = express();

const storage = multer.diskStorage({
  destination: "../client/src/public/uploads/",
  filename: function(req, file, cb){
     cb(null, file.originalname);
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
app.get('/',  (req, res) => res.json('Hello World!'));
app.get('/auth',  (req, res) => res.sendFile(__dirname + "/index.html"))
app.get('/register',  (req, res) => res.sendFile(__dirname + "/index1.html")) //auth поменять на testAPI
app.get('/nextstepreg',  (req, res) => res.sendFile(__dirname + "/index1.html"))
app.post('/', getAnotherProfile)
app.post('/auth', authenticate);
app.post('/register',  register);
app.post('/nextstepreg',  upload.single('avatar'),nextstepreg )
//app.get('/profile', getProfile)
app.post('/profile', getProfile)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))