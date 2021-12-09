import { checkBoolenKey, checkAnd, checkOr } from "../utils/check";
import { CondArray } from "../utils/types";

let stack: Array<CondArray> = [];
let arr: CondArray = [];
let nonius: number = 0;
let temp: string = "";

const advanceStr = function (str: string, possi: number = 1): string {
    return str.slice(possi);
};

const cutString = function (str: string, possi: number = 1): string {
    temp = "";
    nonius = 0;
    return (str = advanceStr(str, possi));
};

const clear = function (): void {
    stack = [];
    arr = [];
    nonius = 0;
    temp = "";
};
export function parseToArr(str: string): CondArray {
    let res: CondArray = [];
    stack.push(arr);
    while (str[nonius]) {
        if (str[nonius] === " " || str[nonius] === "\n") {
            if (temp) stack[stack.length - 1].push(temp);
            str = cutString(str);
            continue;
        }
        if (str[0] === "(") {
            str = cutString(str);
            const tarr: CondArray = [];
            stack.push(tarr);
            continue;
        }
        if (str[nonius] === ")") {
            if (temp) stack[stack.length - 1].push(temp);
            nonius++;
            str = cutString(str, nonius);
            const ts: CondArray = stack.pop();
            stack[stack.length - 1].push(ts);
            continue;
        }
        if (checkBoolenKey(str[nonius]) === checkBoolenKey(str[0])) {
            temp += str[nonius];
            nonius++;
            if (str.length <= nonius) {
                stack[stack.length - 1].push(temp);
                break;
            }
            if (checkAnd(temp) || checkOr(temp)) {
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
