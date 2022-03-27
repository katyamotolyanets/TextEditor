const express = require('express')
const fs = require('fs');
const cors = require('cors')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const app = express();

app.use(cors())

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


app.listen(8000, () => console.log(`Server started on port 8000`))


