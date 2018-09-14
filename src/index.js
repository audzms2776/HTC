const express = require('express');
const app = express();

const EtherAPI = require('./etherAPI.js');
const api = new EtherAPI();

app.get('/cnt', async (req, res) => {
    api.getCounter().then(data => {
        console.log(data);
        return res.send(data);
    })
});

app.listen(3000, () => {
    console.log('server start');
});