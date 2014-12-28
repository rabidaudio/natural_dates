var chai = require('chai');
chai.use(require('chai-datetime'));
var should = chai.should();

require('../src/natural_dates');

var REF_DATE = new Date('2015-01-01T06:00:00.000Z');

Date.natural.referenceDate = REF_DATE;


describe('Date', function(){
  describe('#naturalDate()', function(){
    it('should exist', function(){
        new Date().should.have.property('naturalDate');
        new Date().naturalDate.should.be.a.Function;
    });

    it('should be configurable', function(){
        Date.natural.referenceDate.should.be.ok;
    });

    it('should get Yesterday', function(){
        var yesterday = new Date(2014, 11, 31);
        yesterday.naturalDate().should.eql("Yesterday");
    });
    it('should get Today', function(){
        var today = new Date(2015, 0, 1);
        today.naturalDate().should.eql("Today");
    });
    it('should get Tomorrow', function(){
        var tomorrow = new Date(2015, 0, 2);
        tomorrow.naturalDate().should.eql("Tomorrow");
    });
  })

  describe('#naturalTime()', function(){

  });
})