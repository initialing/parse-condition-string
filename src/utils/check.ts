import { LogicStr } from "./types";
export function checkBoolenKey(char: string): boolean {
    return char != "!" && char != "|" && char != "&";
}

export function checkOr(str: string): str is LogicStr {
    return str === "||";
}

export function checkAnd(str: string): str is LogicStr {
    return str === "&&";
}

export function checkNot(str: string): boolean {
    return /^!{1,}$/.test(str);
}
