const express = require('express')
const bodyParser = require('body-parser')
const ShopingList = require('./model/shopping')
const List = require('./model/list')

const app = express()

app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));

app.get('/index', function (req, res) {
    res.send('Hello World!')
})

const cart = new ShopingList()
const list = new List()

app.post('/create', (req, res) => {
    res.json({
        list: list.initList(),
        status: 'initalized'
    })
})

app.post('/remove', (req, res) => {
    const { id } = req.body
    try{
        cart.removeItem(id)
        res.json({
            list: cart.getCart(),
            status: 'removed'
        })
    } catch(e){
        res.json({
            error: 'Item not in the list'
        }).status(404)
    }
})

app.get('/list/:id', (req, res) => {
    const { id } = req.query
    try{
        const item = cart.getItemFromList(id)
        res.json({
            list: item
        }).status(200)
    }catch(e){
        res.json({
            error: 'Item not in the list'
        }).status(404)
    }
})

app.post('/add', (req, res) => {
    cart.addItemToList(req.body)
    res.json({
        list: cart.getCart(),
        status: 'created'
    }).status(200)
})

app.get('/alllist', (req, res) => {
    if(cart.getCart().length < 1){
        return res.json({
            error: 'Nothing to show'
        }).status(404)
    }
    return res.json({
        list: cart.getCart(),
        status: 'lists'
    })
})


const server = app.listen(3007, () => {
    console.log('Example app listening on port 3000!')
})

module.exports = {
    app,
    server,
}