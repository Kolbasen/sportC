const express = require('express')
const cors = require("cors");
const services = require('./services');
const bodyParser = require("body-parser");
const authenticate = services.authenticate;
const urlencodedParser = bodyParser.urlencoded({extended: false});
const port = 9000;
const app = express()


app.use(cors());
app.get('/', urlencodedParser, (req, res) => res.send('Hello World!'))
app.get('/auth', urlencodedParser, (req, res) => res.sendFile(__dirname + "/index.html")) //auth поменять на testAPI
app.post('/auth', urlencodedParser, authenticate);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))