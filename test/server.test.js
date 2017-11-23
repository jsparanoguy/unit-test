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

    xit('should pass create', () => {
        return request(server).get('/create').then((res) => {
            res.status.should.equal(200)
            res.data.should.not.equal(null)
            res.data.should.not.equal('object')
        })
    })

    xit('should pass delete', () => {
        return request(server).get('/delete/:id').then((res) => {
            res.status.should.equal(200)
            res.params.should.equal(res.params.uid)
        })
    })
})