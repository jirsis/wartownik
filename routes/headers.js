
var set = function(res){
  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-Powered-by", "jirsis");
}

module.exports.setHeaders = set;
