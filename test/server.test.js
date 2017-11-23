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
        return request(server).post('/create').then((res) => {
            res.status.should.equal(200)
            res.body.should.eql({ok: 'ok'})
        })
    })

    xit('should pass delete', () => {
        return request(server).get('/delete/:id').then((res) => {
            res.status.should.equal(200)
            res.params.should.equal(res.params.uid)
        })
    })


    it('should print all list', () => {
        return request(server).get('/alllist/').then((res) => { // lorsqu'on va sur la page, chargement des listes de l'user
        var list = [{a:5,b:7},{a:2},{b:5}];  // get la liste pour comparer
        res.status.should.equal(200); // la page dois s'être correctement chargée
        res.body.should.eql(list); // on compare la liste chargée à celle en donnée brute
    
        })
    })

    it('should print one list', () => {
                return request(server).get('/list/:id').then((res) => {
                res.status.should.equal(200)
            })
        })
})