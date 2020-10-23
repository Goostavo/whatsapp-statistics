/*
* Analytics that:
* Shows top 10 users by messageCount
*/

module.exports = function(messageCount) {

  // Print top 10 users in friendly format
  console.log('Zumbis do grupo (0 mensagens):')
  for (let user of Object.keys(messageCount)){
    if (messageCount[user] == 0){
      console.log(user, ':', messageCount[user])
      //process.stdout.write('@' + user + ', ');
    }
  }
  console.log();
}
