import { parseToArr } from "./lib/stringToArr";
import toCond from "./lib/arrToCond";
import setPriority from "./lib/setPriority";
import { CondArray } from "./utils/types";

const condParse = function (str: string, obj: any): boolean {
    let arr: CondArray = parseToArr(str);
    arr = setPriority(arr);
    const res: boolean = toCond(arr, obj);
    return res;
};

export default condParse;
