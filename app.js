

let firstMessage;
let lastMessage;


var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('zapzap.txt')
});

lineReader.on('line', function (line) {
  console.log('Line from file:', line.length);
});

let isMessage = function(row){

  return false;
};

