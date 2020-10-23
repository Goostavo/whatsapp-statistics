/*
* Analytics that:
* Counts user messages and detect zombies.
*/
const top10UsersByMessage = require('./top10usersByMessage');
const top10usersByLength = require('./top10usersByLength');
const zombieList = require('./zombieList');

module.exports = function(users, messages) {
  let messageCount = {};
  let lengthCount = {};
  for (let user of users){
    messageCount[user] = 0;
    lengthCount[user] = 0;
  }

  for (let message of messages){
    if (!messageCount[message.author]) {
      messageCount[message.author] = 0;
      lengthCount[message.author] = 0;
    }
    messageCount[message.author] = messageCount[message.author] + 1;
    lengthCount[message.author] = lengthCount[message.author] + message.message.length;
  }


  // Run specific Analytics
  top10UsersByMessage(messageCount);
  top10usersByLength(lengthCount);
  zombieList(messageCount);

};
