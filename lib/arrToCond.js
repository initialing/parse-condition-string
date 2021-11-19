const { checkAnd, checkOr, checkNot } = require("./check.js")


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
        default:{
            break;
        }
    }
    return res;
}


let checkNotNum = function(i){
    return i.length%2 + 1;
}

let toCond = function(arr, obj){
    let tempCond = "";
    let not = 0;
    let r = null;
    for(let i of arr){
        if(i instanceof Array){
            if(tempCond){
                if(checkAnd(tempCond)){
                    if(not){
                        not === 2? r = r && !toCond(i,obj): r = r && !!toCond(i,obj);
                    } else {
                        r = r && toCond(i,obj);
                    }
                } else if(checkOr(tempCond)){
                    if(not){
                        not === 2? r = r || !toCond(i,obj): r = r || !!toCond(i,obj);
                    } else {
                        r = r || toCond(i,obj);
                    }
                }
            } else {
                if(not){
                    not === 2? r = !toCond(i,obj):r = !!toCond(i,obj);
                } else {
                    r = toCond(i,obj);
                }
            }
            continue;
        }
        if(checkAnd(i) || checkOr(i) || checkNot(i)){
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
}

exports.toCond = toCond;