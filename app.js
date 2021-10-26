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

// Libs
const fs = require('fs');
const whatsapp = require('whatsapp-chat-parser');
const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')

// Local Libs
const parseUserList = require('./parseUserList');

// Analytics
const userMessagesAndZombies = require('./analytics/userMessagesAndZombies');
const elonMuskers = require('./analytics/elonMuskers');
const wordCloud = require('./analytics/wordCloud');
const thanks = require('./analytics/thankers');
const stickers = require('./analytics/stickers')

/*
*  Command line args definition
*/
const optionDefinitions = [
  {
    name: 'help',
    alias: 'h',
    type: Boolean,
    description: 'Display this usage guide.'
  },
  {
    name: 'zapzap',
    alias: 'z',
    type: String,
    description: 'Whatsapp history file',
    typeLabel: '<file>'
  }
]
const options = commandLineArgs(optionDefinitions);

if (options.help) {
  const usage = commandLineUsage([
    {
      header: 'Zap Zap Analytics',
      content: 'zapzap.txt deve ser no seguinte formato:\n‎[15/06/16 14:07:29] Fausto Silva: ta pegando fogo BICHO!\nuserList.txt deve conter os contatos separados por virgula\nThiago Ventura, Fausto, +55 69 99999-9999'
    },
    {
      header: 'Options',
      optionList: optionDefinitions
    },
    {
      content: 'Project home: {underline https://github.com/Goostavo/whatsapp-statistics/}'
    }
  ])
  console.log(usage)
  return;
}

/*
*   Main code
*/
const fileName = options.zapzap || 'zapzap.txt';

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

  history = history.filter((item) => {
    return item.date > new Date('2020-10-22T00:00:00.000Z');
  });

  console.log('Loaded:', history.length, 'messages.');
  console.log('Loaded:', users.length, 'users.');
  console.log('History start:', history[0].date, 'end:', history[history.length - 1].date);

  //Run analytics
  userMessagesAndZombies(users, history);
  console.log('\n--------------------------------------\n')

  //elonMuskers(history);
  //console.log('\n--------------------------------------\n')

  wordCloud(history);
  console.log('\n--------------------------------------\n')

  thanks(history);
  console.log('\n--------------------------------------\n')

  stickers(history);
  console.log('\n--------------------------------------\n')
}

runSync();
