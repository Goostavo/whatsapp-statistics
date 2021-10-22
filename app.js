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
const thanks = require('./analytics/thankers');
// Analytics
const userMessagesAndZombies = require('./analytics/userMessagesAndZombies');

console.log('Loading files!')
const rawHistory = fs.readFileSync('zapzap.txt', 'utf8');
const rawUsers = fs.readFileSync('userList.txt', 'utf8');

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
  thanks(history);
}

runSync();
