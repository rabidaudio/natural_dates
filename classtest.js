
//Correct
function Cat(name, age, color, gender){
    this.name = (age > 5 ? "ol' "+name : name+" kitty");
    this.age = age;
    this.color = color;
    var gender = gender; //Private, only accessible from inside this constructor
    
    function shed(){ //Private
        console.log("shedding...");
    }
    
    this.scratch = function(){
        console.log("scratching...");
        shed();
    };
    
    //this.meow = function(){ if(this.age>5) console.log("grrrr!"); else console.log('mew!'); };
}

Cat.prototype.meow = function(){ if(this.age>5) console.log("grrrr!"); else console.log('mew!'); };
//Doesn't work, gender is inaccessible Cat.prototype.is_male = function(){ return gender==="male" };
//Doesn't work, shed is inaccessible Cat.prototype.scratch2 = function(){ console.log("scratching..."); shed(); };


 greg = new Cat("greg", 9, "tabby", "male");
 dart = new Cat('dart', 2, "grey", "male");
 
//now let's abstract:

function Class(class_name, methods){
    window[class_name] = a._constructor || new Function();
    for(var m in methods){
        if(m==="_constructor") continue;
        window[class_name].prototype[m] = methods[m];
    }
}
 
 
Class("Cat",
{
    _constructor:function (name, age, color){
            this.name = (age > 5 ? "ol' "+name : name+" kitty");
            this.age = age;
            this.color = color;
    },
    meow:function(){
        (this.age>5 ? console.log("grrrr!") : console.log('mew!') );
    },
});


//better way

function Class(class_name, elements){
    window[class_name]=function(){
        var args = Array.prototype.slice.call(arguments);
        for( var a in args ){
            if(typeof args[a] === function
        }
    };
}


Class("Cat",{
    name: undefined,
    age: 2,
    color: undefined,
    meow: function(){
        (this.age>5 ? console.log("grrrr!") : console.log('mew!') );
    }
});
