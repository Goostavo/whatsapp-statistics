/*
* Analytics that:
* Find Lula Fans
*/

module.exports = function(history) {
    let lulaCite = 0;
    let lulaFans = {};

    for (let entry of history){
      if (entry.message.match(/Lula|lula|molusco|Molusco|nine|nove dedos|/)) {
        lulaCite += 1;

        if (!lulaFans[entry.author]){
          lulaFans[entry.author] = 0;
        }
        lulaFans[entry.author] += 1;
      }
    }

    console.log('Total Lula Messages', lulaCite)

    let countArray = [];
    for (let key in lulaFans){
      countArray.push({
        'author' : key,
        'count': lulaFans[key]
      });
    }
    countArray = countArray.sort(compare).reverse();
    // Print top 10 users in friendly format
    console.log('Top 10 fans do Lula por mensagem que citam Lula:')
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
