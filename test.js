var chai = require('chai');
var expect = chai.expect;

describe('Array', () => {
describe('#indexOf()', ()=> {
    it('GL-1 : should return true if list is created', () =>{
      const result = ["1","2","3"];
      
      expect(result).to.not.have.lengthOf(0);

    })
  })
})


describe('Array', () => {
  describe('#indexOf()', ()=> {
      it('GL-2 : should return true if list is deleted', () =>{
        var result = ["1","2","3"];
       result = null;
        expect(result).to.be.null;
  
      })
    })
  })

