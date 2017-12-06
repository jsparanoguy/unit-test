require('mocha')
const request = require('supertest')
const server = require('../server/server').server
const app = require('../server/server').app
require('chai').should()
const ShopingList = require('../server/model/shopping')

describe('Routes', () => {
    
    it('should pass index', () => {
            return request(server).get('/index').then((res) => {
            res.status.should.equal(200)
        })
    })

    it('should pass create', () => {
        return request(server).post('/create').then((res) => {
            res.status.should.equal(200)
        })
    })

    it('should add one element to the list', () => {
        return request(server).post('/add')
            .send({
                name: 'toto',
                quantity: 1,
                price: 10
            })
            .then((res) => {
                res.status.should.equal(200)
            })
    })

    it('should print all list', () => {
        return request(server).get('/alllist/').then((res) => { // lorsqu'on va sur la page, chargement des listes de l'user
            if(res.body.list.length < 1){
                res.status.should.equal(404)
            }
            res.body.list[0].should.have.keys('id', 'name', 'price', 'quantity')
        })
    })

    it('should print one list', () => {
        return request(server).get(`/list/${1}`).then((res) => {
            res.status.should.equal(200)
        })
    })

    it('should pass delete', () => {
        return request(server).post('/remove').send({
            id: 1
        })
        .then((res) => {
            res.status.should.equal(200)
        })
    })

    it('should not delete if no match in the list and trow an error', () => {
        return request(server).post('/remove').send({
            id: 5
        })
        .then((res) => {
            res.body.should.eql({error: 'Item not in the list'})
        })
    })

    it('Should return an error if no match to find item in the list', () => {
        return request(server).get(`/list/${5}`).then((res) => {
            res.body.should.eql({error: 'Item not in the list'})
        })
    })
        
    after(() => {
        setTimeout(() => {
            process.kill()
        }, 7000)
    });
})

describe('Shopping List', () => {
    let cart
    it('should have 1 item', () => {
        cart = new ShopingList();
        cart.list.length.should.be.equal(1)
    });

    it('should add one item to the shopping cart', () => {
        const item = {
            name: 'Pull',
            quantity: 3,
            price: 16
        }
        const cartLength = cart.list.length
        cart.addItemToList(item)
        cart.list.length.should.be.equal(cartLength + 1)
    })

    it('should remove on item from the shoping cart', () => {
        const myItems = cart.getCart()
        cart.removeItem(myItems[0].id)
        cart.list.length.should.be.equal(cart.getCart().length)
    })

    it('should show the current shoping list', () => {
        const items = cart.list
        cart.getCart().should.be.eql(items)
    })
})