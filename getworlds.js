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

        if (row.children) {
          if (row.children[0]) {
            worlds_p2p.push(Number.parseInt(row.children[0].next.children[1].children[0].data.split('School ')[1]));
          }
        }
      });

      rows = $('.server-list__row:not(.server-list__row--members)');
      Object.keys(rows).forEach(key => {
        const row = rows[key];

        if (row.children) {
          if (row.children[0]) {
            worlds_f2p.push(Number.parseInt(row.children[0].next.children[1].children[0].data.split('School ')[1]));
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