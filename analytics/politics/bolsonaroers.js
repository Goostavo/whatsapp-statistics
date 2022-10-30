/*
* Analytics that:
* Find Bolsonaro Fans
*/

module.exports = function(history) {
    let bozoCite = 0;
    let bozoFans = {};
    
    for (let entry of history){
      if (entry.message.match(/Bozo|bozo|bolsonaro|Bolsonaro|Jair|jair|bozonaro|Bozonaro/)) {
        bozoCite += 1;
        
        if (!bozoFans[entry.author]){
          bozoFans[entry.author] = 0;
        }
        bozoFans[entry.author] += 1;
      }
    }
    
    console.log('Total Bolsonaro Messages', bozoCite)
    
    let countArray = [];
    for (let key in bozoFans){
      countArray.push({
        'author' : key,
        'count': bozoFans[key]
      });
    }
    countArray = countArray.sort(compare).reverse();
    // Print top 10 users in friendly format
    console.log('Top 10 fans do Bolsonaro por mensagen que citam Bolsonaro:')
    for (let userCount = 0; userCount < 10; userCount++){
      console.log('@' + countArray[userCount].author, ':', countArray[userCount].count)
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