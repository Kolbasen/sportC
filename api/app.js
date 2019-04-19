const express = require('express')
const cors = require("cors");
const {authenticate, register} = require('./services');
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const port = 9000;
const app = express()


app.use(cors());
app.get('/', urlencodedParser, (req, res) => res.send('Hello World!'))
app.get('/auth', urlencodedParser, (req, res) => res.sendFile(__dirname + "/index.html"))
app.get('/register', urlencodedParser, (req, res) => res.sendFile(__dirname + "/index1.html")) //auth поменять на testAPI
app.post('/auth', urlencodedParser, authenticate);
app.post('/register', urlencodedParser, register);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))