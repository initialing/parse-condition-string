import { checkAnd, checkOr } from "../utils/check";
import { CondArray } from "../utils/types";

const setPriority = function (arr: CondArray): CondArray {
    const stack: Array<CondArray> = [];
    let first: boolean = true;
    while (1) {
        let tempArr: CondArray;
        if (stack.length > 0) {
            tempArr = stack.shift();
        } else if (first) {
            first = false;
            tempArr = arr;
        }
        let slow: number = 0;
        let fast: number = 0;
        let pri: boolean = false;
        let temp = [];
        while (tempArr[fast]) {
            if (tempArr[fast] instanceof Array) {
                stack.push(tempArr[fast] as CondArray);
                fast++;
            } else if (checkAnd(tempArr[fast] as string)) {
                pri = true;
                fast++;
            } else if (checkOr(tempArr[fast] as string)) {
                if (pri) {
                    temp = tempArr.splice(slow, fast - 1);
                    tempArr.splice(slow, 0, temp);
                    temp = [];
                    slow += 2;
                    fast = slow;
                    pri = false;
                } else {
                    fast++;
                    slow = fast;
                }
            } else {
                fast++;
            }
            if (fast >= tempArr.length) {
                if (pri && slow != 0) {
                    temp = tempArr.splice(slow, fast - 1);
                    tempArr.splice(slow, 0, temp);
                }
                break;
            }
        }
        if (stack.length === 0) break;
    }
    return arr;
};
export default setPriority;
