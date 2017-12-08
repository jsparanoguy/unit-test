class ShopingList {
    constructor(){
        this.list = null
        this.createShopingList()
    }

    createShopingList(){
        this.list = []
        return this.list
    }

    addItemToList({ name, quantity, price }){
        const item = {
            name,
            quantity,
            price, 
            id: this.uuid()
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

    rand(){
      return Math.floor(Math.random() * 9) + 1    
    }

    uuid(generate = [], sign = true, called = 1){
        let i = 0;
        while(i < 5){
            generate.push(this.rand())
            i++
        }
        if(sign && called < 3){
            generate.push('-')
        }

        if(called === 4){
            return generate.toString().replace (/,/g, "")
        }

        return this.uuid(generate, true, called + 1)
    }
}

module.exports = ShopingList
