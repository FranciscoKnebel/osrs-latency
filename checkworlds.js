const ping = require('ping');
const getWorlds = require('./getworlds');

const
  url = (id) => `oldschool${id}.runescape.com`,
  p2p = {
    promises: [],
    ids: [],
    worlds: []
  },
  f2p = {
    promises: [],
    ids: [],
    worlds: []
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

module.exports = ({
  checkF2P = true,
  checkP2P = true
}) => {
  if (!checkF2P && !checkP2P) {
    console.log('F2P and P2P worlds disabled.')
    return;
  }

  getWorlds(async data => {

    if (checkF2P) {
      f2p.worlds = data.worlds_f2p;

      console.log('\nFree to Play Worlds'.bold);
      f2p.worlds = f2p.worlds.sort((a, b) => a - b);
      f2p.worlds.forEach((world, index) => {
        f2p.ids.push(300 + index);
        f2p.promises.push(ping.promise.probe(url(world)));
      });
      await getLatencyOfWorlds(f2p.promises, f2p.ids);
    }

    if (checkP2P) {
      p2p.worlds = data.worlds_p2p;

      console.log('\nPay to Play Worlds'.bold);
      p2p.worlds = p2p.worlds.sort((a, b) => a - b);
      p2p.worlds.forEach((world, index) => {
        p2p.ids.push(300 + index);
        p2p.promises.push(ping.promise.probe(url(world)));
      });
      await getLatencyOfWorlds(p2p.promises, p2p.ids);
    }

  });
}