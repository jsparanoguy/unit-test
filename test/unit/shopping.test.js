require('mocha')
require('chai').should()
const ShopingList = require('../../server/model/shopping')

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

