var chai = require('chai');
chai.use(require('chai-datetime'));
var should = chai.should();

require('../src/natural_dates');

var REF_DATE = new Date('2015-01-01T06:30:00.000Z'); //a Thursday at 1:30 am EST
Date.natural.referenceDate = REF_DATE;

describe('Date', function(){

  it('should be globally configurable', function(){
    Date.natural.referenceDate.should.be.ok;
  });

  describe('#getNaturalDate()', function(){
    it('should exist', function(){
      new Date().should.have.property('getNaturalDate');
      new Date().getNaturalDate.should.be.a.Function;
    });

    it('should get Yesterday', function(){
      var yesterday = new Date(2014, 11, 31);
      yesterday.getNaturalDate().should.eql("Yesterday");
    });
    it('should get Today', function(){
      var today = new Date(2015, 0, 1);
      today.getNaturalDate().should.eql("Today");
    });
    it('should get Tomorrow', function(){
      var tomorrow = new Date(2015, 0, 2);
      tomorrow.getNaturalDate().should.eql("Tomorrow");
    });
    it('should get later in the week', function(){
      var monday = new Date(2015, 0, 5);
      monday.getNaturalDate().should.eql("This Monday");
    });
    it('should get earlier in the week', function(){
      var monday = new Date(2014, 11, 29);
      monday.getNaturalDate().should.eql("Last Monday");
    });
    it('should get two weeks from now', function(){
      var monday = new Date(2015, 0, 12);
      monday.getNaturalDate().should.eql("Next Monday the 12th");
    });
    it('should get future dates this year',function(){
      var april = new Date(2015, 3, 1);
      april.getNaturalDate().should.eql('April 1st');
    });
    it('should get past dates this year',function(){
      var april = new Date(2014, 9, 2);
      april.getNaturalDate().should.eql('October 2nd');
    });
    it('should get future dates other years',function(){
      var april = new Date(2016, 3, 1);
      april.getNaturalDate().should.eql('April 1st 2016');
    });
    it('should get past dates other years',function(){
      var april = new Date(2013, 9, 2);
      april.getNaturalDate().should.eql('October 2nd 2013');
    });

    it('shold be instance configurable', function(){
      var monday = new Date(2015, 0, 5);
      monday.getNaturalDate({referenceDate: monday}).should.eql('Today');
    });
  });

  describe('#getNaturalTime()', function(){
    describe('exact times', function(){
      it('should handle am', function(){
        var morning = new Date(2015, 0, 1, 3, 0);
        morning.getNaturalTime().should.eql('3 am');
      });
      it('should handle pm', function(){
        var afternoon = new Date(2015, 0, 1, 15, 0);
        afternoon.getNaturalTime().should.eql('3 pm');
      });
      it('should handle noon', function(){
        var noon = new Date(2015, 0, 1, 12, 0);
        noon.getNaturalTime().should.eql('noon');
      });
      it('should handle midnight', function(){
        var midnight = new Date(2015, 0, 1, 0, 0);
        midnight.getNaturalTime().should.eql('midnight');
      });
    });

    describe('exact times with minutes', function(){
      it('should handle minutes', function(){
        var morning = new Date(2015, 0, 1, 3, 41);
        morning.getNaturalTime().should.eql('3:41 am');
      });
      it('should have two-digit minutes', function(){
        var afternoon = new Date(2015, 0, 1, 15, 05);
        afternoon.getNaturalTime().should.eql('3:05 pm');
      });
      it('should handle before noon', function(){
        var noon = new Date(2015, 0, 1, 11, 55);
        noon.getNaturalTime().should.eql('5 minutes before noon');
      });
      it('should handle after noon', function(){
        var noon = new Date(2015, 0, 1, 12, 4);
        noon.getNaturalTime().should.eql('4 minutes after noon');
      });
      it('should handle before midnight', function(){
        var midnight = new Date(2014, 11, 31, 23, 59);
        midnight.getNaturalTime().should.eql('1 minute to midnight');
      });
      it('should handle after midnight', function(){
        var midnight = new Date(2015, 0, 1, 0, 2);
        midnight.getNaturalTime().should.eql('2 minutes past midnight');
      });
    });

    describe('rounding', function(){
      it('should round down to hour', function(){
        var morning = new Date(2015, 0, 1, 3, 1);
        morning.getNaturalTime({roundTime: 5}).should.eql('3 am');
      });
      it('should round up to hour', function(){
        var morning = new Date(2015, 0, 1, 3, 53);
        morning.getNaturalTime({roundTime: 15}).should.eql('4 am');
      });
      it('should round down to minute', function(){
        var morning = new Date(2015, 0, 1, 3, 4);
        morning.getNaturalTime({roundTime: 5}).should.eql('3:05 am');
      });
      it('should round up to minute', function(){
        var morning = new Date(2015, 0, 1, 3, 50);
        morning.getNaturalTime({roundTime: 15}).should.eql('3:45 am');
      });


      it('should round to noon', function(){
        var noon = new Date(2015, 0, 1, 11, 56);
        noon.getNaturalTime({roundTime: 15}).should.eql('noon');
      });
      it('should round near noon', function(){
        var noon = new Date(2015, 0, 1, 12, 12);
        noon.getNaturalTime({roundTime: 15}).should.eql('15 minutes after noon');
      });
      it('should round to midnight', function(){
        var midnight = new Date(2014, 0, 1, 0, 6);
        midnight.getNaturalTime({roundTime: 15}).should.eql('midnight');
      });
      it('should round near midnight', function(){
        var midnight = new Date(2014, 11, 31, 23, 54);
        midnight.getNaturalTime({roundTime: 5}).should.eql('5 minutes to midnight');
      });
    });
  });

  describe('#toRelativeString()', function(){
    it("should handle now", function(){
      var now = new Date(2015, 0, 1, 1, 29, 15);
      now.toRelativeString().should.eql("now");
    });

    describe("past", function(){
      it("should handle short times", function(){
        var short = new Date(2015, 0, 1, 1, 29, 00);
        short.toRelativeString().should.eql("1 minute ago");
      });
      it("should handle longer times", function(){
        var long = new Date(2015, 0, 1, 1, 2);
        long.toRelativeString().should.eql("30 minutes ago");
      });
      it('should handle hours', function(){
        var hours = new Date(2014, 11, 31, 13, 0);
        hours.toRelativeString().should.eql("12 hours ago");
      });
      it("should handle days", function(){
        var days = new Date(2014, 11, 31, 1, 0);
        days.toRelativeString().should.eql("1 day ago");
      });
      it("should handle weeks", function(){
        var weeks = new Date(2014, 11, 16, 12, 0);
        weeks.toRelativeString().should.eql("2 weeks ago");
      });
      it("should handle months", function(){
        var months = new Date(2014, 4, 31, 12, 0);
        months.toRelativeString().should.eql("7 months ago");
      });
      it('should handle years', function(){
        var years = new Date(2012, 11, 31, 12, 0);
        years.toRelativeString().should.eql("2 years ago");
      })
    });
  });
});