const { checkBoolenKey, checkAnd, checkOr } = require("./check");
const { error } = require("./error.js");


let stack = [];
let arr = [];
let nonius = 0;
let temp = "";

let advanceStr = function(str, possi = 1){
    return typeof str === "string"? str.slice(possi):error("input type is not string");
}

let cutString = function(str, possi = 1){
    temp = "";
    nonius = 0;
    return str = advanceStr(str,possi);
}

let clear = function(){
    stack = [];
    arr = [];
    nonius = 0;
    temp = "";
}
exports.parseToArr = function(str){
    let res = [];
    stack.push(arr);
    while(str[nonius]){
        if(str[nonius] === " " || str[nonius] === "\n") {
            if(temp) stack[stack.length - 1].push(temp);
            str = cutString(str);
            continue;
        }
        if(str[0] === "("){
            str = cutString(str);
            let tarr = [];
            stack.push(tarr);
            continue;
        }
        if(str[nonius] === ")"){
            if(temp) stack[stack.length - 1].push(temp);
            nonius++;
            str = cutString(str,nonius);
            let ts = stack.pop();
            stack[stack.length - 1].push(ts);
            continue;
        }
        if(checkBoolenKey(str[nonius]) === checkBoolenKey(str[0])){
            temp += str[nonius];
            nonius++;
            if(str.length <= nonius){
                stack[stack.length - 1].push(temp);
                break;
            }
            if(checkAnd(temp) || checkOr(temp)){
                stack[stack.length - 1].push(temp);
                str = cutString(str, nonius);
                continue;
            }
        } else {
            stack[stack.length - 1].push(temp);
            str = cutString(str, nonius);
        }
    }
    res = arr;
    clear();
    return res;
}