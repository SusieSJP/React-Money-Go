const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..','public','index.html'));
});

// listen to local port 3000 and the second argument is the call back funtion
// and it just gets called when the server is actually up.
app.listen(port, () => {
  console.log('server is up!')
});
