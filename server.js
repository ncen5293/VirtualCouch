const express = require("express");
const cors = require("cors");
const path = require('path');
const app = express();
const hobbyRouter = require("./routes/hobbies");
const commentsRouter = require("./routes/comments");
const { lobbyRouter } = require("./routes/lobbies");

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/portfolio", hobbyRouter, commentsRouter);
app.use("/lobbys", lobbyRouter);

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const io = require('socket.io')(server);

module.exports = {
  app,
  io
};

require('./socket/socket');
