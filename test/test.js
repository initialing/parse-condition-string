let c = require("../src/index.js");

let obj = {
    a:false,
    b:true,
    c:false,
    d:true,
    e:true,
    f:true,
}

let conditions = [
    "a||b",
    "(a||b)&& !d",
    "(a &&(b||c)) || !!d",
    "!f"
]
console.log((obj.a || obj.b) === c(conditions[0], obj));
// true
console.log(((obj.a || obj.b) && !obj.d) === c(conditions[1], obj));
// true
console.log(((obj.a && (obj.b || obj.c)) || !!obj.d) === c(conditions[2], obj));
// true
console.log((!obj.f) === c(conditions[3], obj));
// true


// console.log(c(conditions[1], obj));