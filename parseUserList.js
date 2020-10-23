/*
* Parse user list function.
*/

module.exports = function parseUserList(rawUser) {
  rawUser = rawUser.replace('\n', '');
  return rawUser.split(', ');
};
