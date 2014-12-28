Date = (function(D){
/*  Appends some useful natural language methods to Date. American system only.
    Written by Charles Knight, charles@rabidaudio.com - 2014
*/
    //configure
    D.natural = {
        referenceDate: null,
        roundTime: 0,
    };

    var module = D.prototype;

    module.naturalTime = function(opts){
        var hours = this.getHours();
        var minutes = this.getMinutes();
        var ampm = "am";
        if( hours == 0 ){
            hours = 12;
        }else if(hours == 12){
            ampm="pm";
        }else if(hours>12){
            hours = hours % 12;
            ampm = "pm";
        }
        if( hours==12 && minutes==0 ) return (ampm=="am" ? "midnight" : "noon");

        // if(opts.round){
        //     date.setMinutes( Math.round(date.getMinutes()/60*2)*30 ); //round to half-hours
        // }
        return hours+( minutes != 0 ? ":"+(minutes<10?"0":"")+minutes : "" )+" "+ampm;
    }

    module.naturalDate = function(opts){
        var d = this;
        var today = Date.natural.referenceDate || new Date();
        var one_day = 1000*60*60*24;
        var diff = Math.ceil((d.getTime() - today.getTime())/one_day);
        if(diff==-1)                return "Yesterday";
        else if(diff==0)            return "Today";
        else if(diff==1)            return "Tomorrow";
        else if(diff<0 && diff>-7)  return "Last "+day_to_string(d.getDay());
        else if(diff>0 && diff<7)   return "This "+day_to_string(d.getDay());
        else if(diff>=7 && diff<14) return "Next "+day_to_string(d.getDay())+
                                                " the "+module.number_endings(d.getDate());
        else                        return month_to_string(d.getMonth())+" "+
                                                module.number_endings(d.getDate());
    };

    //HELPERS
    var number_endings = function(n){
        if(n>10 && n<14) return n+"th"; //special case 11th - 13th
        switch(n%10){
            case 1:  return n+"st"; break;
            case 2:  return n+"nd"; break;
            case 3:  return n+"rd"; break;
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
    return D;
}(Date));
