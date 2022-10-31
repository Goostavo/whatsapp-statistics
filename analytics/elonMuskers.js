/*
* Analytics that:
* Find Elon Musk fans
*/

module.exports = function(history) {
  let elonMuskMessages = 0;
  let muskersFans = {};
  
  for (let entry of history){
    if (entry.message.match(/Elon|elon|musk|Musk|eoln|Eoln|Tesla|tesla/)) {
      elonMuskMessages += 1;
      
      if (!muskersFans[entry.author]){
        muskersFans[entry.author] = 0;
      }
      muskersFans[entry.author] += 1;
    }
  }
  
  console.log('Total Elon Musk Messages', elonMuskMessages)
  
  let countArray = [];
  for (let key in muskersFans){
    countArray.push({
      'author' : key,
      'count': muskersFans[key]
    });
  }
  countArray = countArray.sort(compare).reverse();
  // Print top 10 users in friendly format
  console.log('Top 10 fans do Elon Musk por mensagen que citam Elon Musk/Tesla:')
  for (let userCount = 0; userCount < 10; userCount++){
    console.log('@' + countArray[userCount]?.author, ':', countArray[userCount]?.count)
  }
  console.log();
  
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