const shopingList = require('./shopping')

class List extends shopingList {
    constructor(){
        super()

        this.allList = null
        this.initList()
    }

    initList(){
        this.allList = {
            0: this.getCart()
        }

        return this.allList
    }

    addShopingList(){
        const keys = Object.keys(this.allList) 
        const last = this.allList.length
      //  console.log('last', last)
        //const add = Object.assign({ list : [{name: 'lol', quantity: '3', price: '9001'}] }, this.list)
        // const final = shopList.concat(add)
        const add =[]
        add.push(this.allList)
        add.push( {1 : [{name: 'lol', quantity: '3', price: '9001'}]})
        //const shopList = new List();
        //const add = {name: 'lol', quantity: '2', price: '15'}           
        //this.list = this.list.concat(add)
        
      this.allList = add
     
        return this.allList
    }

    removeShopintList(key){
        const keys = Object.keys(this.allList)
        const check = keys.includes(key)
        if(check){
            delete this.allList[key]
           
        } else {
            throw new Error('This Key doesnt exists')
        }
        return this.allList
    }

    showAllShopingLists(){
        const arrayList = []
        const { allList } = this
        for(let i in allList){
            arrayList.push(allList[i])
        }

        return arrayList
    }

    showSingleShopingList(key){
        const keys = Object.keys(this.allList)
        const check = keys.includes(key)
        if(check){
            return this.allList[key]
        } else {
            throw new Error('This Key doesnt exists')
        }
    }
}

module.exports = List
