const ping = require('ping');
require('colors');
const getWorlds = require('./getworlds');

const
  url = (id) => `oldschool${id}.runescape.com`,
  promises = [],
  ids = [];

getWorlds(worlds => {
  worlds = worlds.sort((a, b) => a - b);

  worlds.forEach((world, index) => {
    ids.push(300 + index);
    promises.push(ping.promise.probe(url(world)));
  });

  console.log('OSRS World Latency\n'.underline.bold);

  Promise
    .all(promises)
    .then(
      (data) => data.map((value, index) => ({
        world: ids[index],
        ms: value.time,
        host: value.host
      }))
    )
    .then(data => data.filter(e => e.ms !== 'unknown'))
    .then(data => data.sort((a, b) => a.ms - b.ms))
    .then(data => {
      console.log('Total Amount of', 'P2P Worlds'.bold, `: ${data.length}`);
      return data;
    })
    .then(data => data.slice(0, 10))
    .then(worlds => {
      console.log(
        'Lowest latency world:',
        `World ${worlds[0].world}`.underline.bold, '-', `${worlds[0].ms} ms`.underline.bold
      );

      console.log('Top 10 lowest latency:');
      console.log(worlds);
    })
});