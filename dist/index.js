(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.condParse = factory());
})(this, (function () { 'use strict';

    var stringToArr = {};

    var check = {};

    check.checkBoolenKey = function(char){
        return char != "!" && char != "|" && char != "&";
    };

    check.checkOr = function(str){
        return str === "||";
    };

    check.checkAnd = function(str){
        return str === "&&";
    };

    check.checkNot = function(str){
        return /^\!{1,}$/.test(str);
    };

    var error$1 = {};

    error$1.error = function(msg){
        throw new Error(msg);
    };

    const { checkBoolenKey, checkAnd: checkAnd$2, checkOr: checkOr$2 } = check;
    const { error } = error$1;


    let stack = [];
    let arr = [];
    let nonius = 0;
    let temp = "";

    let advanceStr = function(str, possi = 1){
        return typeof str === "string"? str.slice(possi):error("input type is not string");
    };

    let cutString = function(str, possi = 1){
        temp = "";
        nonius = 0;
        return str = advanceStr(str,possi);
    };

    let clear = function(){
        stack = [];
        arr = [];
        nonius = 0;
        temp = "";
    };
    stringToArr.parseToArr = function(str){
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
                if(checkAnd$2(temp) || checkOr$2(temp)){
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
    };

    var arrToCond = {};

    const { checkAnd: checkAnd$1, checkOr: checkOr$1, checkNot } = check;


    let trans = function(pre, con, curr, not, obj){
        if(not && !con){
            if(not === 2){
                return !obj[curr];
            } else if(not === 1) {
                return !!obj[curr];
            }
        } else if(!con){
            return obj[curr];
        }
        let res = pre;
        switch(con){
            case("||"):{
                if(not){
                    if(not === 2){
                        res = res || !obj[curr];
                    } else if(not === 1) {
                        res = res || !!obj[curr];
                    }
                } else {
                    res = res || obj[curr];
                }
                break;
            }
            case("&&"):{
                if(not){
                    if(not === 2){
                        res = res && !obj[curr];
                    } else if(not === 1) {
                        res = res && !!obj[curr];
                    }
                } else {
                    res = res && obj[curr];
                }
                break;
            }
        }
        return res;
    };


    let checkNotNum = function(i){
        return i.length%2 + 1;
    };

    let toCond$1 = function(arr, obj){
        let tempCond = "";
        let not = 0;
        let r = null;
        for(let i of arr){
            if(i instanceof Array){
                if(tempCond){
                    if(checkAnd$1(tempCond)){
                        if(not){
                            not === 2? r = r && !toCond$1(i,obj): r = r && !!toCond$1(i,obj);
                        } else {
                            r = r && toCond$1(i,obj);
                        }
                    } else if(checkOr$1(tempCond)){
                        if(not){
                            not === 2? r = r || !toCond$1(i,obj): r = r || !!toCond$1(i,obj);
                        } else {
                            r = r || toCond$1(i,obj);
                        }
                    }
                } else {
                    if(not){
                        not === 2? r = !toCond$1(i,obj):r = !!toCond$1(i,obj);
                    } else {
                        r = toCond$1(i,obj);
                    }
                }
                continue;
            }
            if(checkAnd$1(i) || checkOr$1(i) || checkNot(i)){
                if(checkNot(i)){
                    not = checkNotNum(i);
                } else {
                    tempCond = i;
                }
                continue;
            } else {
                if(tempCond){
                    r = trans(r, tempCond, i, not, obj);
                    not = 0;
                    tempCond = "";
                } else {
                    r = trans(null, null, i, not, obj);
                    not = 0;
                }
            }
        }
        return r;
    };

    arrToCond.toCond = toCond$1;

    var setPriority$2 = {};

    const { checkAnd, checkOr } = check;

    let setPriority$1 = function(arr){
        let slow = 0;
        let fast = 0;
        let pri = false;
        let temp = [];
        while(arr[fast]){
            if(arr[fast] instanceof Array){
                arr[fast] = setPriority$1(arr[fast]);
                fast++;
            }else if(checkAnd(arr[fast])){
                pri = true;
                fast++;
            } else if(checkOr(arr[fast])){
                if(pri){
                    temp = arr.splice(slow, fast-1);
                    arr.splice(slow,0,temp);
                    temp = [];
                    slow +=2;
                    fast = slow;
                    pri = false;
                } else {
                    fast++;
                    slow = fast;
                }
            } else {
                fast++;
            }
            if(fast >= arr.length){
                if(pri && slow != 0){
                    temp = arr.splice(slow, fast-1);
                    arr.splice(slow,0,temp);
                }
                break;
            }
        }
        return arr;
    };

    setPriority$2.setPriority = setPriority$1;

    const { parseToArr } = stringToArr;
    const { toCond } = arrToCond;
    const { setPriority } = setPriority$2;

    const condParse = function(str, obj){
        let arr = parseToArr(str);
        arr = setPriority(arr);
        let res = toCond(arr, obj);
        return res;
    };

    var src = condParse;

    var parseConditionString = src;

    return parseConditionString;

}));
