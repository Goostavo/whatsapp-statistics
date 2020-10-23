/*
* Analytics that:
* Shows top 10 users by lengthCount
*/

module.exports = function(lengthCount) {
  // Top 10 ranking
  let countArray = [];
  for (let key in lengthCount){
    countArray.push({
      'author' : key,
      'count': lengthCount[key]
    });
  }
  countArray = countArray.sort(compare).reverse();
  // Print top 10 users in friendly format
  console.log('Top 10 spammers do grupo por contagem de caracteres:')
  for (let userCount = 0; userCount < 10; userCount++){
    console.log('@' + countArray[userCount].author, ':', countArray[userCount].count)
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
