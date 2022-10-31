/*
* Analytics that:
* Find thanks messages
*/

module.exports = function(history) {
    let thanksMessages = 0;
    let kindPeople = {};

    for (let entry of history){
      if (entry.message.match(/Obrigado|Obrigada|obrigado|obrigada|Valeu|valeu|vlw|obg|thx|thanks|thank|brigado|brigada|obrigado!|obrigada!|Obrigado!|Obrigada!|obg!|thx!|thanks!|thank!|brigado!|brigada!|🙏/)) {
        thanksMessages += 1;

        if (!kindPeople[entry.author]){
          kindPeople[entry.author] = 0;
        }
        kindPeople[entry.author] += 1;
      }
    }

    console.log('\nTotal de Mr./Ms. Gratidão 🙏:', thanksMessages)

    let countArray = [];
    for (let key in kindPeople){
      countArray.push({
        'author' : key,
        'count': kindPeople[key]
      });
    }
    let maxUsers = 10;
    if(countArray.length < 10){
      maxUsers = countArray.length;
    }

    countArray = countArray.sort(compare).reverse();
    // Print top 10 users in friendly format
    console.log(`Top ${maxUsers} Mr./Ms. Gratidão 🙏:`);
    for (let userCount = 0; userCount < maxUsers; userCount++){
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
