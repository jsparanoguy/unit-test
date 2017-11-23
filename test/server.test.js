require('mocha')
const request = require('supertest')
const server = require('../server/server')
require('chai').should()

describe('Routes', () => {
    it('should pass index', () => {
            return request(server).get('/index').then((res) => {
            res.status.should.equal(200)
        })
    })

    it('should pass create', () => {
        let book = {
            title: "The Lord of the Rings",
            author: "J.R.R. Tolkien",
            year: 1954
        }
        return request(server).post('/create').send(book).then((res) => {
            res.status.should.equal(200)
            res.request._data.should.eql(book)
        })
    })

    xit('should pass delete', () => {
        return request(server).get('/delete/:id').then((res) => {
            res.status.should.equal(200)
            res.params.should.equal(res.params.uid)
        })
    })
})