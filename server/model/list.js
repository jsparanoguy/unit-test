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

    createNewShopingList(){
        const keys = Object.keys(this.allList)
        const last = parseInt(keys[keys.length - 1]) + 1
        const newList = Object.assign({[last]: this.createShopingList()}, this.allList)

        this.allList = newList
        return this.allList
    }

    addShopingList(key, params){
        return this.allList[key].concat(this.addItemToList(params))
    }

    removeShopintList(key){
        const keys = Object.keys(this.allList)
        const check = keys.find(k=> k == key)
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
        const check = keys.find(k=> k == key)
        if(check){
            return this.allList[key]
        } else {
            throw new Error('This Key doesnt exists')
        }
    }
}

module.exports = List
