/*
* Parse user list function.
*/

module.exports = function parseUserList(rawUser) {
  return rawUser.split(', ');
};
