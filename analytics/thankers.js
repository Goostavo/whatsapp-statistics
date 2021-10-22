/*
* Analytics that:
* Find thanks messages
*/

module.exports = function(history) {
    let thanksMessages = 0;
    let kindPeople = {};
    
    for (let entry of history){
      if (entry.message.match(/Obrigado|obrigado|obg|thx|thanks|thank|brigado|obrigado!|Obrigado!|obrigado!|obg!|thx!|thanks!|thank!|brigado!/)) {
        thanksMessages += 1;
        
        if (!kindPeople[entry.author]){
          kindPeople[entry.author] = 0;
        }
        kindPeople[entry.author] += 1;
      }
    }
    
    console.log('Total de thankers:', thanksMessages)
    
    let countArray = [];
    for (let key in kindPeople){
      countArray.push({
        'author' : key,
        'count': kindPeople[key]
      });
    }
    countArray = countArray.sort(compare).reverse();
    // Print top 10 users in friendly format
    console.log('Top 10 thankers:')
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