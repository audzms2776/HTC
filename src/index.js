const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const EtherAPI = require('./etherAPI.js');
const api = new EtherAPI();

app.get('/cnt', (req, res) => {
    api.getAddress().then(data => {
        console.log(data);
        return res.send(data);
    })
});

app.post('/addUser', (req, res) => {
    const userIdx = req.body.userIdx;

    api.addUser(userIdx).then(data => {
        return res.send(data);
    })
});

app.listen(3000, () => {
    console.log('server start');
});