const Crawler = require("crawler");

module.exports = (cb) => {
  function fetchAndGetMemberWorlds(e, res) {
    if (e) {
      console.error(e)
      cb();
    } else {
      const $ = res.$;
      const worlds = [];
      rows = $('.server-list__row');

      Object.keys(rows).forEach(key => {
        const row = rows[key];

        if (row.children) {
          if (row.children[0]) {
            worlds.push(Number.parseInt(row.children[0].next.children[1].children[0].data.split('School ')[1]));
          }
        }
      });

      cb(worlds);
    }
  }

  const uri = 'http://oldschool.runescape.com/slu';

  const c = new Crawler({
    maxConnections: 10,
    callback: fetchAndGetMemberWorlds
  })

  c.queue([uri]);
}