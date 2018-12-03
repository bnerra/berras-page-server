const app = require('./app');

const server = app.listen(8081, () => {

  let host = server.address().address
  let port = server.address().port
  
  console.log('App listening at http://%s:%s', host, [port])
});