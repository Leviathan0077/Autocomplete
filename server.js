const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const fs = require('fs');
const port = process.env.PORT || 8003;
const app = express();


app.use(express.static(path.join(__dirname, 'public')));

app.get('/data/states', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'state.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data');
        }
        else {
            res.json(JSON.parse(data));
        }
    });
});








app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);

});