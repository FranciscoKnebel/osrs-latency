const ping = require('ping');
require('colors');
const getWorlds = require('./getworlds');

const
  url = (id) => `oldschool${id}.runescape.com`,
  p2p = {
    promises: [],
    ids: []
  },
  f2p = {
    promises: [],
    ids: []
  };

function getLatencyOfWorlds(promises, ids) {
  return Promise
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
      console.log('Total Amount of', 'Worlds'.bold, `: ${data.length}`);
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
    });
}

getWorlds(async data => {
  let {
    worlds_p2p,
    worlds_f2p
  } = data;

  console.log('OSRS World Latency'.underline.bold);

  console.log('\nFree to Play Worlds'.bold);
  worlds_f2p = worlds_f2p.sort((a, b) => a - b);
  worlds_f2p.forEach((world, index) => {
    f2p.ids.push(300 + index);
    f2p.promises.push(ping.promise.probe(url(world)));
  });
  await getLatencyOfWorlds(f2p.promises, f2p.ids);

  console.log('\nPay to Play Worlds'.bold);
  worlds_p2p = worlds_p2p.sort((a, b) => a - b);
  worlds_p2p.forEach((world, index) => {
    p2p.ids.push(300 + index);
    p2p.promises.push(ping.promise.probe(url(world)));
  });
  await getLatencyOfWorlds(p2p.promises, p2p.ids);
});