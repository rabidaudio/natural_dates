if(!String.prototype.trimRight) String.prototype.trimRight = function(){ return this.replace(/\s+$/,"") };
if(!String.prototype.trimLeft) String.prototype.trimLeft = function(){ return this.replace(/^\s+/,"") };



//speedtest
String.prototype.regexway=function(){
    return this.replace(/\s+$/,"")
}
String.prototype.loopway=function(){
    for(var i=this.length;i-->0;){
        var c = this[i];
        if(c===" " || c==="\t" || c==="\n" || c==="\r") break;
    }
    return this.substr(0,i+1);
}

String.prototype.loopwaytwo=function(){
    for(var i=this.length;i-->0;){
        var c = this[i];
        if(c===" " || c==="\t" || c==="\n" || c==="\r") continue;
        break;
    }
    return this.substr(0,i+1);
}

var test_count = 100000;

function generate_tests(ws_ammount){
    var whitespace = [" "];//[" ","\t","\n","\r"];

    var tests=Array(test_count);
    for(var i=0; i<test_count;i++){
        var ws = "";
        for(var j=0;j<ws_ammount;j++) ws+=whitespace[Math.round(Math.random()*(whitespace.length-1))];
        tests[i]= Array(Math.round(Math.random()*64)).join("x") + ws;
    }
    return tests;
}
function run_regex_test(tests){
    var output=Array(test_count);
    var start = new Date().getTime();
    for(var i=0;i<tests.length;i++){
        output[i]=tests[i].regexway();
    }
    var end = new Date().getTime();
    return end - start;
}
function run_loop_test(tests){
    var output=Array(test_count);
    var start = new Date().getTime();
    for(var i=0;i<tests.length;i++){
        output[i]=tests[i].loopway();
    }
    var end = new Date().getTime();
    return end - start;
}

function run_loop2_test(tests){
    var output=Array(test_count);
    var start = new Date().getTime();
    for(var i=0;i<tests.length;i++){
        output[i]=tests[i].loopwaytwo();
    }
    var end = new Date().getTime();
    return end - start;
}

var r_speeds=[];
var l_speeds=[];
var l2_speeds=[];
for(var t=0; t<10;t++){
    var tests=generate_tests(t);
    var r = run_regex_test(tests);
    var l = run_loop_test(tests);
    var l2 = run_loop2_test(tests);
    r_speeds.push(r);
    l_speeds.push(l);
    l2_speeds.push(l2);
    console.log(t+": regex: "+r+"\taverage: "+r/test_count);
    console.log(t+": loop: "+l+"\taverage: "+l/test_count);
    console.log(t+": loop2: "+l2+"\taverage: "+l2/test_count);
}

Math.sum = function(array){
    var sum=0.0;
    array.forEach(function(e,i,a){
        sum+=parseFloat(e);
    });
    return sum;
};
Math.average = function(array){
    return Math.sum(array)/array.length;
};

console.log(r_speeds);
console.log(l_speeds);
console.log(l2_speeds);
console.log("regex final average: "+Math.average(r_speeds));
console.log("loop final average: "+Math.average(l_speeds));
console.log("loop2 final average: "+Math.average(l2_speeds));


/******************************************************
RESULTS: suprisingly favor regex

in Chrome:

0: regex: 59	average: 0.00059
0: loop: 67	average: 0.00067
1: regex: 110	average: 0.0011
1: loop: 102	average: 0.00102
2: regex: 102	average: 0.00102
2: loop: 97	average: 0.00097
3: regex: 97	average: 0.00097
3: loop: 114	average: 0.00114
4: regex: 96	average: 0.00096
4: loop: 117	average: 0.00117
5: regex: 91	average: 0.00091
5: loop: 145	average: 0.00145
6: regex: 118	average: 0.00118
6: loop: 152	average: 0.00152
7: regex: 91	average: 0.00091
7: loop: 154	average: 0.00154
8: regex: 91	average: 0.00091
8: loop: 164	average: 0.00164
9: regex: 99	average: 0.00099
9: loop: 184	average: 0.00184
[59, 110, 102, 97, 96, 91, 118, 91, 91, 99] VM435:67
[67, 102, 97, 114, 117, 145, 152, 154, 164, 184] VM435:68
regex final average: 95.4 VM435:69
loop final average: 129.6 


in node:

0: regex: 181	average: 0.00181
0: loop: 263	average: 0.00263
1: regex: 273	average: 0.00273
1: loop: 342	average: 0.00342
2: regex: 285	average: 0.00285
2: loop: 334	average: 0.00334
3: regex: 314	average: 0.00314
3: loop: 307	average: 0.00307
4: regex: 310	average: 0.0031
4: loop: 380	average: 0.0038
5: regex: 307	average: 0.00307
5: loop: 389	average: 0.00389
6: regex: 301	average: 0.00301
6: loop: 386	average: 0.00386
7: regex: 268	average: 0.00268
7: loop: 420	average: 0.0042
8: regex: 311	average: 0.00311
8: loop: 336	average: 0.00336
9: regex: 173	average: 0.00173
9: loop: 358	average: 0.00358
[ 181, 273, 285, 314, 310, 307, 301, 268, 311, 173 ]
[ 263, 342, 334, 307, 380, 389, 386, 420, 336, 358 ]
regex final average: 272.3
loop final average: 351.5



you'd think only spaces would be better. not the case

[60, 94, 93, 86, 99, 100, 85, 106, 100, 88]
[68, 82, 83, 89, 104, 101, 101, 114, 110, 117]
[67, 88, 99, 86, 99, 105, 102, 113, 129, 117]
regex final average: 91.1
loop final average: 96.9
loop2 final average: 100.5 
