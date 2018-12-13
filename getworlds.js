const Crawler = require("crawler");

module.exports = (cb) => {
  function fetchAndGetMemberWorlds(e, res) {
    if (e) {
      console.error(e)
      cb();
    } else {
      const $ = res.$;

      const worlds_p2p = [];
      const worlds_f2p = [];

      rows = $('.server-list__row.server-list__row--members');
      Object.keys(rows).forEach(key => {
        const row = rows[key];

        let id;
        let activity;
        let players;
        if (row.children) {
          if (row.children[0]) {
            id = Number.parseInt(row.children[0].next.children[1].children[0].data.split('School ')[1]);
          }
          if (row.children[9]) {
            activity = row.children[9].children[0].data;
          }
          if (row.children[2]) {
            players = Number.parseInt(row.children[2].next.children[0].data.split(' ')[0]);
          }
        }

        worlds_p2p.push({
          id,
          activity,
          players
        });
      });

      rows = $('.server-list__row:not(.server-list__row--members)');
      Object.keys(rows).forEach(key => {
        const row = rows[key];

        let id;
        let activity;
        let players;
        if (row.children) {
          if (row.children[0]) {
            if (row.children[0]) {
              id = Number.parseInt(row.children[0].next.children[1].children[0].data.split('School ')[1]);
            }
            if (row.children[9]) {
              activity = row.children[9].children[0].data;
            }
            if (row.children[2]) {
              players = Number.parseInt(row.children[2].next.children[0].data.split(' ')[0]);
            }

            worlds_f2p.push({
              id,
              activity,
              players
            });
          }
        }
      });

      cb({
        worlds_p2p,
        worlds_f2p
      });
    }
  }

  const uri = 'http://oldschool.runescape.com/slu';

  const c = new Crawler({
    maxConnections: 10,
    callback: fetchAndGetMemberWorlds
  })

  c.queue([uri]);
}