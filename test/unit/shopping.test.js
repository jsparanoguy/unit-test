require('mocha')
require('chai').should()
const ShopingList = require('../../server/model/shopping')

describe('Create Shopping List', () => {
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

    xit('should remove on item from the shoping cart', () => {
        const myItems = ShopingList.getCart()
        cart.removeItem(id)
        cart.should.be.equal(myItems.length - 1)
    })
})

