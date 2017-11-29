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
            res.body.should.eql({ok: 'ok'})
        })
    })

    xit('should pass delete', () => {
        return request(server).get('/delete/:id').then((res) => {
            res.status.should.equal(200)
            res.params.should.equal(res.params.uid)
        })
    })


    it('should print all list', () => {
        return request(server).get('/alllist/').then((res) => { // lorsqu'on va sur la page, chargement des listes de l'user
            var list = [{a:5,b:7},{a:2},{b:5}];  // get la liste pour comparer
            res.status.should.equal(200); // la page dois s'être correctement chargée
            res.body.should.eql(list); // on compare la liste chargée à celle en donnée brute
    
        })
    })

    it('should print one list', () => {
                return request(server).get('/list/:id').then((res) => {
                res.status.should.equal(200)
            })
        })
        
    after(function (done) {
        server.close();
        done();
    });
})

describe('Shopping List', () => {
    let cart
    it('should be empty', () => {
        cart = new ShopingList();
        cart.list.length.should.be.equal(0)
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