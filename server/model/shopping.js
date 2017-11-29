const uuid = require('uuid')

class ShopingList {
    constructor(){
        this.list = null
        this.createShopingList()
    }

    createShopingList(){
        this.list = [];
    }

    addItemToList({ name, quantity, price }){
        const item = {
            name,
            quantity,
            price, 
            id: uuid.v1()
        }
        this.list.push(item)
    }
}

module.exports = ShopingList
