module.exports = function(db, params, options) {
  
  // Fetch Entry
  var stmt = db.prepare(`SELECT * FROM ${options.table} WHERE ID IS NOT NULL`);
  let resp = [];
  for (var row of stmt.iterate()) {
    try {
      let data = JSON.parse(row.json)
      if(typeof data == 'string') data = JSON.parse(data)
      resp.push({
        ID: row.ID,
        data
      })
    } catch (e) {}
  }
  resp.forEach(async (value, key) => {
    value.data.replaceAll(/"/g, "");
  });
  return resp;
  
}
