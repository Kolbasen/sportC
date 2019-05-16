const express = require('express')
const cors = require("cors");
const {authenticate, register} = require('./services');
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const port = 9000;
const app = express()

app.use(urlencodedParser);
app.use(cors());
app.get('/',test, (req, res) => res.send('Hello World!'))
app.get('/auth', (req, res) => res.sendFile(__dirname + "/index.html"))
app.get('/register', (req, res) => res.sendFile(__dirname + "/index1.html")) //auth поменять на testAPI
app.post('/auth', authenticate);
app.post('/register', register);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))