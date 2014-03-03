/*Object.prototype.test_existance = function(){ //todo fucks up for(key in obj)
    var args = Array.prototype.slice.call(arguments);
    for( var i=args.length; i-->0; ) if( this[args[i]] == undefined ) return false; return true;
}*/

if(Object.prototype.hasProp === undefined){
    Object.defineProperty(Object.prototype, 'hasProp', {
    value: function() {
        var args = Array.prototype.slice.call(arguments);
        for( var i=args.length; i-->0; ){
            if( typeof args[i] !== "string" ){
                throw new TypeError(typeof args[i] + " given in place of string");
            }
            var period = args[i].indexOf('.');
            if(period>-1){
               if(!this[args[i].substr(0, period)].hasProp(args[i].substr(period+1))){
                   return false;
               }else{
                   continue;
               }
            }
            if(this[args[i]]==undefined){
              return false;
            }
        }
        return true;
    },
    enumerable: false
    });
}

void 0===Object.prototype.hasProp&&Object.defineProperty(Object.prototype,"hasProp",{value:function(){for(var a=Array.prototype.slice.call(arguments),b=a.length;0<b--;){if("string"!==typeof a[b])throw new TypeError(typeof a[b]+" given in place of string");var c=a[b].indexOf(".");if(-1<c)if(this[a[b].substr(0,c)].a(a[b].substr(c+1)))continue;else return!1;if(void 0==this[a[b]])return!1}return!0},enumerable:!1});

//test

d={a: "bark", b: 0, c:undefined, d: [], e: { a: { b: '1' } }, f: ""}
for(var test in [d.hasElem('e.a')               ===true,
d.hasElem('a', 'b')             ===true,
d.hasElem('a', 'b', 'c')        ===false,
d.hasElem('a', 'b', 'e.a')      ===true,
d.hasElem('a', 'b', 'e.b')      ===false,
d.hasElem('a', 'b', 'e.a.b')    ===true,
d.hasElem('a', 'b', 'e.a.c')    ===false,
d.hasElem('d', 'f')             ===true,
d.hasElem('a.b')                ===false]) if(!test) return 'Fails!';

/*
    http://sugarjs.com/native:
    If we define a function on a prototype in the same way, it will also be enumerable:

    Object.prototype.getName = function() {
      return this.name;
    };
    for(var key in {}) {
      console.log(key);
    }
    > getName
    This will cause unexpected results in loops, and is not what we want. Fortunately, with a slightly different syntax, we can define a function on an object that is not enumerable:

    Object.defineProperty(Object.prototype, 'getName', {
      value: function() {
        return this.name;
      },
      enumerable: false
    });
    for(var key in {}) {
      console.log(key);
    }
    > (No output)
*/
