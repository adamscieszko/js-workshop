var express = require('express');
var server = express();

server.configure(function(){
  server.use(express.static(__dirname + '/'));
});

server.listen(3030);
console.log('server listening on 3030');
