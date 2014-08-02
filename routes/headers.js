
var set = function(res){
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("X-Powered-by", "jirsis");
}

module.exports.setHeaders = set;
