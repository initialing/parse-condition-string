
exports.checkBoolenKey = function(char){
    return char != "!" && char != "|" && char != "&";
}

exports.checkOr = function(str){
    return str === "||";
}

exports.checkAnd = function(str){
    return str === "&&";
}

exports.checkNot = function(str){
    return /^\!{1,}$/.test(str);
}
