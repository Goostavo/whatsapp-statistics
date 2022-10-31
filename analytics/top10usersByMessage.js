/*
* Analytics that:
* Shows top 10 users by messageCount
*/

module.exports = function(messageCount) {
  // Top 10 ranking
  let countArray = [];
  for (let key in messageCount){
    countArray.push({
      'author' : key,
      'count': messageCount[key]
    });
  }
  countArray = countArray.sort(compare).reverse();
  // Print top 10 users in friendly format
  console.log('Top 10 faladores do grupo por contagem de mensagens:')
  for (let userCount = 0; userCount < 10; userCount++){
    console.log('@' + countArray[userCount]?.author, ':', countArray[userCount]?.count)
  }
}

function compare( a, b ) {
  if ( a.count < b.count ){
    return -1;
  }
  if ( a.count > b.count ){
    return 1;
  }
  return 0;
}
