import { checkAnd, checkOr, checkNot } from "../utils/check";
import { CondArray, LogicStr } from "../utils/types";

const trans = function (
    pre: boolean,
    con: LogicStr,
    curr: string,
    not: number,
    obj: any
): boolean {
    if (not && !con) {
        if (not === 2) {
            return !obj[curr];
        } else if (not === 1) {
            return !!obj[curr];
        }
    } else if (!con) {
        return obj[curr];
    }
    let res = pre;
    switch (con) {
        case "||": {
            if (not) {
                if (not === 2) {
                    res = res || !obj[curr];
                } else if (not === 1) {
                    res = res || !!obj[curr];
                }
            } else {
                res = res || obj[curr];
            }
            break;
        }
        case "&&": {
            if (not) {
                if (not === 2) {
                    res = res && !obj[curr];
                } else if (not === 1) {
                    res = res && !!obj[curr];
                }
            } else {
                res = res && obj[curr];
            }
            break;
        }
        default: {
            break;
        }
    }
    return res;
};

const checkNotNum = function (i: string) {
    return (i.length % 2) + 1;
};

const toCond = function (arr: CondArray, obj: any) {
    let tempCond: LogicStr = "";
    let not: number = 0;
    let r: boolean = null;
    for (const i of arr) {
        if (i instanceof Array) {
            if (tempCond) {
                if (checkAnd(tempCond)) {
                    if (not) {
                        not === 2
                            ? (r = r && !toCond(i, obj))
                            : (r = r && !!toCond(i, obj));
                    } else {
                        r = r && toCond(i, obj);
                    }
                } else if (checkOr(tempCond)) {
                    if (not) {
                        not === 2
                            ? (r = r || !toCond(i, obj))
                            : (r = r || !!toCond(i, obj));
                    } else {
                        r = r || toCond(i, obj);
                    }
                }
            } else {
                if (not) {
                    not === 2 ? (r = !toCond(i, obj)) : (r = !!toCond(i, obj));
                } else {
                    r = toCond(i, obj);
                }
            }
            continue;
        }
        if (checkAnd(i) || checkOr(i) || checkNot(i)) {
            if (checkNot(i)) {
                not = checkNotNum(i);
            } else if (checkAnd(i) || checkOr(i)) {
                tempCond = i;
            }
            continue;
        } else {
            if (tempCond) {
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

export default toCond;
