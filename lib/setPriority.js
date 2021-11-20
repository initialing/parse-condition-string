const { checkAnd, checkOr } = require("./check.js");

let setPriority = function(arr){
    let slow = 0;
    let fast = 0;
    let pri = false;
    let temp = [];
    while(arr[fast]){
        if(arr[fast] instanceof Array){
            arr[fast] = setPriority(arr[fast]);
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
            if(pri){
                temp = arr.splice(slow, fast-1);
                arr.splice(slow,0,temp);
            }
            break;
        }
    }
    return arr;
}

exports.setPriority = setPriority;