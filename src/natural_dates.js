(function(D){
/*  Appends some useful natural language methods to Date. American system only.
    Written by Charles Knight, charles@rabidaudio.com - 2014
*/
    //configure
    D.natural = {
        referenceDate: null,
        roundTime: 0,
    };

    var module = D.prototype;

    var ONE_SEC  = 1000;
    var ONE_MIN  = ONE_SEC*60;
    var ONE_HOUR = ONE_MIN*60;
    var ONE_DAY  = ONE_HOUR*24;

    /**
    *   Such as '1 pm', '3:16 am', 'noon', or '5 minutes to midnight'
    */
    module.getNaturalTime = function(opts){
        var d = round_time(this, opts);
        var hours = d.getHours();
        var minutes = d.getMinutes();

        var ampm = (hours >= 12 ? "pm" : "am");

        var day_minutes = hours*60+minutes;

        var noon     = (day_minutes >= (11.5*60) && day_minutes <= (12.5*60));
        var midnight = (day_minutes >= (23.5*60) || day_minutes <= (1.5 *60));

        if(noon || midnight){
            var result = [];
            if(minutes>30 && minutes !== 0){
                result.push(pluralize(60-minutes, "minute"));
                result.push(noon ? "before" : "to");
            }else if(minutes !== 0){
                result.push(pluralize(minutes, "minute"));
                result.push(noon ? "after" : "past");
            }
            result.push(noon ? "noon" : "midnight");
            return result.join(" ");
        }

        hours = (hours % 12)+"";
        if(minutes === 0)
            return hours+" "+ampm;

        minutes = minutes+"";
        if(minutes.length < 2)
            minutes="0"+minutes;

        return hours+":"+minutes+" "+ampm;
    };

    /**
    *   Such as 'Tomorrow', 'Last Tuesday', 'Next Thursday the 11th', 'October 2nd'
    */
    module.getNaturalDate = function(opts){
        var d = this;
        var refDate = getReferenceDate(opts);
        var past = ((d-refDate) < 0);
        var diff_days = Math.abs(Math.round((d - refDate)/ONE_DAY));

        if(diff_days <= 0)
            return "Today";
        if(diff_days <= 1)
            return (past ? "Yesterday" : "Tomorrow");

        if(diff_days < 7)
            return ( past ? "Last" : "This")+" "+day_to_string(d.getDay());
        if(diff_days < 14 && !past)
            return "Next "+day_to_string(d.getDay())+" the "+number_endings(d.getDate());

        var month = month_to_string(d.getMonth());
        var day = number_endings(d.getDate());
        var result = [month, day];
        if(diff_days > 365)
            result.push(d.getFullYear());
        return result.join(" ");
    };

    /**
    *   Such as 'now', '5 minutes ago', '6 weeks from now'
    */
    module.toRelativeString = function(opts){
        var d = this;
        var refDate = getReferenceDate(opts);
        var past = ((d-refDate) < 0);
        var diff_sec = Math.abs(Math.round((d - refDate)/ONE_SEC));
        var diff_min = Math.abs(Math.round((d - refDate)/ONE_MIN));
        var diff_hours = Math.abs(Math.round((d - refDate)/ONE_HOUR));
        var diff_days = Math.abs(Math.round((d - refDate)/ONE_DAY));

        var suffix = " " + (past ? "ago" : "from now");

        if(diff_sec < 60)    //now
            return "now";
        if(diff_min < 5)    //5 minutes
            return pluralize(diff_min, "minute") + suffix;
        if(diff_min < 60)   //55 minutes
            return pluralize(Math.round(diff_min/5)*5, "minute") + suffix;
        if(diff_hours < 23) //23 hours
            return pluralize(diff_hours, "hour") + suffix;
        if(diff_days < 14)  //13 days
            return pluralize(diff_days, "day") + suffix;
        if(diff_days < 6*7) //5 weeks
            return pluralize(Math.round(diff_days/7), "week") + suffix;
        if(diff_days < 365) //11 months
            return pluralize(Math.round(diff_days/(365/12)), "month") + suffix;
        return pluralize(Math.round(diff_days/365), "year") + suffix; //12 years
    };

    /**
    *   Such as 'Yesterday at 1pm' or 'Next Wednesday at noon'
    */
    module.toNaturalString = function(opts){
        return this.getNaturalDate(opts)+" at "+this.getNaturalTime(opts);
    };


    //HELPERS
    var pluralize = function(num, word){
        // "12 cabbages" or "-1 carrot"
        return num + " " +word+(Math.abs(num)==1 ? "" : "s");
    };

    var round_time = function(date, opts){
        var round;
        var d = date;
        if(opts && opts.roundTime){
            round = opts.roundTime % 60;
        }else{
            round = (D.natural.roundTime || 0) % 60;
        }
        if(round > 0)
            d.setMinutes(Math.round(d.getMinutes()/round)*round);
        return d;
    };
    var getReferenceDate = function(opts){
        if(opts && opts.referenceDate)
            return opts.referenceDate;
        return D.natural.referenceDate || new Date();
    };

    var number_endings = function(n){
        if((n%100)>10 && (n%100)<14) return n+"th"; //special case 11th - 13th
        switch(n%10){
            case 1:  return n+"st";
            case 2:  return n+"nd";
            case 3:  return n+"rd";
            default: return n+"th";
        }
    };
    
    var day_to_string = function(d){
        return [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ][d];
    };

    var month_to_string = function(m){
        return [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ][m];
    };

}(Date));
