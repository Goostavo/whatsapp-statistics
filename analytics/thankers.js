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
    if(countArray.length < 10){
      console.log('Numero de contatos deve ser maior que 10');
      return ;
    }

    countArray = countArray.sort(compare).reverse();
    // Print top 10 users in friendly format
    console.log('Top 10 Mr./Ms. Gratidão 🙏:')
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
