/*
* app.js
*
* Message format:
{
  date: 2019-07-04T13:39:00.000Z,
  author: '+1 123 123 123 123',
  message: 'Message here.'
}
*
* Users format:
* ['Person 1', 'Person 2']
*/
const fs = require('fs');
const whatsapp = require('whatsapp-chat-parser');
const parseUserList = require('./parseUserList');
const elonMuskers = require('./analytics/elonMuskers');

// Analytics
const userMessagesAndZombies = require('./analytics/userMessagesAndZombies');

var myArgs = process.argv.slice(2);

if (myArgs[0] == 'help'){
    console.log('\nzapzap.txt deve ser no seguinte formato:');
    console.log('‎[15/06/16 14:07:29] Fausto Silva: ta pegando fogo BICHO!');
    console.log('\nuserList.txt deve conter os contatos separados por virgula')
    console.log('Thiago Ventura, Fausto, +55 69 99999-9999\n');
    return ;
}

console.log('Loading files!')

let rawHistory;
let rawUsers;

try {
  rawHistory = fs.readFileSync('zapzap.txt', 'utf8');
  rawUsers = fs.readFileSync('userList.txt', 'utf8');
} catch (e) {
    console.log('Menssagem: '+ e.message);
    return ;
}

async function runSync(){
  console.log('Parsing files')
  let history;
  let users;
  try {
    history = await whatsapp.parseString(rawHistory);
    users = parseUserList(rawUsers);
  } catch (err) {
    console.log(err);
  }

  console.log('Loaded:', history.length, 'messages.');
  console.log('Loaded:', users.length, 'users.');
  console.log('History start:', history[0].date, 'end:', history[history.length - 1].date);

  //Run analytics
  userMessagesAndZombies(users, history);
  elonMuskers(history);
}

runSync();
