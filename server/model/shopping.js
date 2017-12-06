const uuid = require('uuid')

class ShopingList {
    constructor(){
        this.list = null
        this.createShopingList()
    }

    createShopingList(){
        this.list = [{
            name: 'tata',
            quantity: 1,
            price: 15,
            id: 1,
        }]
        return this.list
    }

    addItemToList({ name, quantity, price }){
        const item = {
            name,
            quantity,
            price, 
            id: uuid.v1()
        }
        this.list.push(item)
        return this.list
    }

    getItemFromList(id){
        if(this.list.find(elem => elem.id === id)){
            return this.list.filter(elem => elem.id === id)
        }
        throw new Error('Item not in the list')
    }

    removeItem(id){
        const { list } = this
        if(this.list.find(elem => elem.id === id)){
            return this.list = list.filter(item => item.id !== id)
        }
        throw new Error('Item not in the list')
    }

    getCart(){
        return this.list
    }
}

module.exports = ShopingList
