const { parseToArr } = require("../lib/stringToArr.js");
const { toCond } = require("../lib/arrToCond.js");
const { setPriority } = require("../lib/setPriority.js");

const condParse = function(str, obj){
    let arr = parseToArr(str);
    arr = setPriority(arr);
    let res = toCond(arr, obj);
    return res;
}

module.exports = condParse;