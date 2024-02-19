require('dotenv').config();
require('./utils/logger');
require('./models');
require('./services');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const { PORT } = process.env;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// socket.io
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server);

const { conversation, webhook, user, channel, flow, intent, bot } = require('./routes');
const { authorize, authenticate } = require('./middlewares/auth');
const controllers = require('./controllers');
const services = require('./services');

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use((err, req, res, next) => {
  console.error(err.message);
  console.error(err.stack);
  res.status(500).send({ statusCode: 500, message: 'Something went wrong! ' + err.message, data: null });
});

app.set('view engine', 'ejs');

// app.use((req, res, next) => {
//   console.log(`Incoming Request - Path: ${req.path}, Method: ${req.method}`);
//   console.log('Request Body:', req.body);
//   next(); // Call the next middleware in the stack
// });

const buildPath = path.join(__dirname, 'build');
const scriptPath = path.join(__dirname, 'script');
const chatboxPath = path.join(__dirname, 'chatbox');

if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));

  // Serve index.html for non-API routes
  app.get(/^\/(?!api|script|socket.io|chatbox).*/, (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

if (fs.existsSync(scriptPath)) {
  // Serve index.html for non-API routes
  app.get('/script/chatbot', (req, res) => {
    fs.readFile(path.join(scriptPath, 'chatbox.js'), 'utf8', (err, scriptContent) => {
      if (err) {
        console.error(err);
        res.send('Error reading the script file');
      } else {
        res.send(scriptContent);
      }
    });
  });
}

if (fs.existsSync(chatboxPath)) {
  app.use('/chatbox', express.static(chatboxPath));

  app.get('/chatbox', (req, res) => {
    res.sendFile(path.join(chatboxPath, 'index.html'));
  });
}

io.on('connection', (socket) => {
  var query = socket.handshake.query;
  const userId = query.userId;
  socket.join(userId);

  socket.on('message', (data) => {
    const { address, message } = data;

    io.to(address.split('_')[1]).emit('received', data);

    if (!message || !address) return;

    const channelId = address.split('_')[0];

    const channel = services.channelService.channels.find((e) => e.ContactId == channelId);

    if (!channel) return console.log('Can not find web channel to send message', channelId);

    channel.sendMessageToBot({ userId: address.split('_')[1], message });
  });
});

//routes
app.use('/api/v3/conversations', conversation);
app.use('/api/webhook', webhook);
app.use('/api/channel', authenticate, channel);
app.use('/api/flow', authenticate, flow);
app.use('/api/intent', authenticate, intent);
app.use('/api/bot', bot);
app.use('/api', user);

app.get('/api/list-active-channels', authorize, controllers.channel.getAllChannels);
app.get('/api/channels', authorize, services.channelService.getAllChannels);

app.get('/api', (req, res) => {
  res.send({ message: 'Server is working' });
});

server.listen(PORT || 3000, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

module.exports = { io };
