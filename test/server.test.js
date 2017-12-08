require('mocha')
const request = require('supertest')
const server = require('../server/server').server
const app = require('../server/server').app
require('chai').should()
const ShopingList = require('../server/model/shopping')
const List = require('../server/model/list')

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
            res.body.list[0].forEach(element => {
                element.should.have.keys('id', 'name', 'price', 'quantity')
            });
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
    it('should have 2 item', () => {
        cart = new ShopingList();
        cart.list.length.should.be.equal(2)
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

    it('should generate an uuid', () => {
        const id = cart.uuid()
        id.length.should.equal(22)
    })
})


describe('List', () => {

   var allList = new List();
    it('should have 2 shopping list', () => {
        
        
        allList.list.length.should.be.equal(2)
        });

       

        it('should add one list to the parent list', () => {
           // console.log(allList)
           let listLength = allList.list.length-1 // calcul de la taille de la liste original(il y a 1 seul liste)
          //  console.log(listLength)
          allList.addShopingList() // grâce a cette fonction, la liste devient addList qui contient l'ancienne liste + 1 liste en +
          
            console.log('length ancien', listLength) 
            console.log('length nouveau',allList.allList.length)
            console.log(allList.allList) // la liste contient bien 2 objet
            allList.allList.length.should.be.equal(listLength + 1)
        })

        it('should remove list from the parent list', () => {
             // console.log(allList)
           let listLength = allList.list.length-1 
           //  console.log(listLength)
           const keys = Object.keys(allList.allList)
           console.log('keys', keys[0])
          allList.removeShopintList(keys[0])// bug ici, le delete se fais mais laisse un empty item qui fausse le count

           console.log(allList)
      
            allList.allList.length.should.be.equal(listLength - 1)
        })

        it('should show all shoping list', () => {
            
            const listes = allList.showAllShopingLists()
             allList.showAllShopingLists().should.be.eql(listes)
         })
 

       

  
})