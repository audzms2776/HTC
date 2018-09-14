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

app.get('/getUserBalance', (req, res) => {
    const userIdx = req.query.userIdx;

    api.getUserBalance(userIdx).then(data => {
        return res.send({balance: data});
    });
});

app.post('/addUser', (req, res) => {
    const userIdx = req.body.userIdx;

    api.addUser(userIdx).then(data => {
        return res.send(data);
    })
});

app.post('/addPlaceAddress', (req, res) => {
    const place = req.body.place;
    const placeAddress = req.body.placeAddress;

    api.addPlaceAddress(place, placeAddress).then(data => {
        return res.send({place: place, placeAddress: data});
    });
});

app.post('/addToken', (req, res) => {
    const place = req.body.place;
    const money = req.body.money;
    const userIdx = req.body.userIdx;

    api.addToken(place, money, userIdx).then(() => {
        return res.send({place: place, money: money, userIdx: userIdx});
    });
});

app.listen(3000, () => {
    console.log('server start');
});