const { checkAnd, checkOr } = require("./check.js");

let setPriority = function(arr){
    let stack = [];
    let first = true;
    while(1){
        let tempArr;
        if(stack.length > 0){
            tempArr = stack.shift();
        } else if(first) {
            first = false;
            tempArr = arr;
        }
        let slow = 0;
        let fast = 0;
        let pri = false;
        let temp = [];
        while(tempArr[fast]){
            if(tempArr[fast] instanceof Array){
                stack.push(tempArr[fast]);
                fast++;
            }else if(checkAnd(tempArr[fast])){
                pri = true;
                fast++;
            } else if(checkOr(tempArr[fast])){
                if(pri){
                    temp = tempArr.splice(slow, fast-1);
                    tempArr.splice(slow,0,temp);
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
            if(fast >= tempArr.length){
                if(pri && slow != 0){
                    temp = tempArr.splice(slow, fast-1);
                    tempArr.splice(slow,0,temp);
                }
                break;
            }
        }
        if(stack.length ===0 ) break;
    }
    return arr;
}

exports.setPriority = setPriority;