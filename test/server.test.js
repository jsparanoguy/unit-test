require('mocha')
const request = require('supertest')
const server = require('../server/server')

xdescribe('Routes', () => {
    it('should pass index', () => {
            return request(server).get('/index').then((res) => {
            res.status.should.be.equal(200)
        })
    })

    xit('should pass create', () => {
        return request(server).get('/create').then((res) => {
            res.status.should.be.equal(200)
            res.data.should.not.be.equal(null)
            res.data.should.not.be.equal('object')
        })
    })

    xit('should pass delete', () => {
        return request(server).get('/delete/:id').then((res) => {
            res.status.should.be.equal(200)
            res.params.should.be.equal(res.params.uid)
        })
    })
})