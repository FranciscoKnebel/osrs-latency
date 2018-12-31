#!/usr/bin/env node

const fs = require('fs');
const getWorlds = require('../getworlds');

getWorlds(({ worlds_f2p, worlds_p2p }) => {
  fs.writeFileSync('./worlds/f2p', worlds_f2p.map(e => e.id));
  fs.writeFileSync('./worlds/p2p', worlds_p2p.map(e => e.id));
});
