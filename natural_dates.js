Date = (function(module){
/*  Appends some useful natural language methods to Date. American system only.
    Written by Charles Knight, charles@rabidaudio.com - 2014
*/
    module.prototype.pretty_time = function(){
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
        return hours+( minutes != 0 ? ":"+(minutes<10?"0":"")+minutes : "" )+" "+ampm;
    }
    module.prototype.pretty_date = function(){
        var d = this;
        var today = new Date();
        var one_day = 1000*60*60*24;
        var diff = Math.ceil((d.getTime() - today.getTime())/one_day);
        if(diff==-1)                return "Yesterday at "+d.pretty_time();
        else if(diff==0)            return "Today at "+d.pretty_time();
        else if(diff==1)            return "Tomorrow at "+d.pretty_time();
        else if(diff<0 && diff>-7)  return "Last "+module.day_to_string(d.getDay())+" at "+d.pretty_time();
        else if(diff>0 && diff<7)   return "This "+module.day_to_string(d.getDay())+" at "+d.pretty_time();
        else if(diff>=7 && diff<14) return "Next "+module.day_to_string(d.getDay())+
                                                " the "+module.number_endings(d.getDate())+" at "+d.pretty_time();
        else                        return module.month_to_string(d.getMonth())+" "+
                                                module.number_endings(d.getDate())+" at "+d.pretty_time();
    }

    //HELPERS
    module.number_endings = function(n){
        if(n>10 && n<14) return n+"th"; //special case 11th - 13th
        switch(n%10){
            case 1:  return n+"st"; break;
            case 2:  return n+"nd"; break;
            case 3:  return n+"rd"; break;
            default: return n+"th";
        }
    }
    
    module.day_to_string = function(d){
        return [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ][d];
    }

    module.month_to_string = function(m){
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
    }
    return module;
}(Date));
