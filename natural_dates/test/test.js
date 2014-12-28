var chai = require('chai');
chai.use(require('chai-datetime'));
var should = chai.should();

require('../src/natural_dates');

describe('Date', function(){
  describe('#natural()', function(){
    it('should exist', function(){
        Date.should.have.property('natural');
    });
  })
})