const fs = require('fs');
const whatsapp = require('whatsapp-chat-parser');
const parseUserList = require('./parseUserList');

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
  console.log('Loaded:', history.length, 'messages.')
  console.log('Loaded:', users.length, 'users.')

}

runSync();
