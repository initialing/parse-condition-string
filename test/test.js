let c = require("../src/index.js");

let obj = {
    a:false,
    b:true,
    c:false,
    d:true,
    e:true,
    f:true,
}

let conditions = {
    "a||b": true,
    "(a||b)&& !d": false,
    "(a &&(b||c)) || !!d": true,
    "!f": false,
    "a||d&&c && (e || f && d) && !d": false
}


test("test",()=>{
    for(let i in conditions){
        expect(c(i,obj)).toBe(conditions[i]);
    }
})