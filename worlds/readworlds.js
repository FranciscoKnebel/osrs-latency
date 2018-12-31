const fs = require('fs');

function readWorlds(filename) {
  return fs
    .readFileSync(filename, {
      encoding: 'utf-8'
    })
    .split(',')
    .map(e => ({
      id: parseInt(e, 10),
      activity: '',
      players: null
    }));
}

const value = {
  worlds_f2p: readWorlds('worlds/f2p'),
  worlds_p2p: readWorlds('worlds/p2p'),
}

module.exports = () => value;
