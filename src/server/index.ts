const express = require('express');
const Server = require('http').Server;

let app = express();
app.server = Server(app);

require('./config/express')(app);

app.server.listen(3001, () => {
  console.log('Server running on port 3001');
});