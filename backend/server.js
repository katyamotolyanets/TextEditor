const express = require('express')
const fs = require('fs');
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require("path");
const jsonParser = bodyParser.json()

const PORT = process.env.PORT || 8000

const app = express();

app.use(cors())

app.use(express.static(path.resolve(__dirname, "../frontend/build")));

app.get('/uploads', (req, res) => {
    const data = fs.readFileSync('./data.json');
    res.send(
        data
    )})

app.post('/uploads', jsonParser, (req, res) => {
    const data = JSON.stringify(req.body)
    fs.writeFile('./data.json', data, (error) => {
        if (error) {
            res.sendStatus(400);
        }
        res.send(data)
    });
})

app.listen(PORT, () => console.log(`Server started on port 8000`))


