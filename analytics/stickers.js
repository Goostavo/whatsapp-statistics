/*
* Analytics that:
* Find sticker messages
*/

module.exports = function(history) {
  
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
