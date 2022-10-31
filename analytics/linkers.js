/*
* Analytics that:
* Find links
*/

module.exports = function(history) {
    let urlLinks = 0;
    let linkCount = {};
    
    for (let entry of history){
      if (entry.message.match(/http/)) {
        urlLinks += 1;
        
        if (!linkCount[entry.author]){
          linkCount[entry.author] = 0;
        }
        linkCount[entry.author] += 1;
      }
    }
    
    console.log('Total Links Messages', urlLinks)
    
    let countArray = [];
    for (let key in linkCount){
      countArray.push({
        'author' : key,
        'count': linkCount[key]
      });
    }
    countArray = countArray.sort(compare).reverse();
    // Print top 10 users in friendly format
    console.log('Top 10 compartilhadores de links:')
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