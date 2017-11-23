const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));

app.get('/index', function (req, res) {
    res.send('Hello World!')
})

app.post('/create', (req, res) => {
    const body = req.body
    console.log(body)
    if(body){
        res.send('yes')
    }
})

app.get('/list/:id', function (req, res) {
    res.send('Voici votre liste : ')
})


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

module.exports = app