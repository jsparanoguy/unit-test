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
        const last = this.allList[this.allList.length - 1] + 1;
        const add = Object.assign({ last : this.getCart }, this.allList)

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
