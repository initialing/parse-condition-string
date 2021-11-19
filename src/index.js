const { parseToArr } = require("../lib/stringToArr.js");
const { toCond } = require("../lib/arrToCond.js");

const condParse = function(str, obj){
    let arr = parseToArr(str);
    let res = toCond(arr, obj);
    return res;
}

module.exports = condParse;