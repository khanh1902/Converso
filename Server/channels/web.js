const Provider = require('./base');
const { io } = require('../index');

module.exports = class WebProvider extends Provider {
  constructor(providerData) {
    super(providerData);
    let { credentials } = providerData;
    if (typeof credentials == 'string') credentials = JSON.parse(credentials);
  }

  async sendMessageToUser({ userId, text }) {
    io.to(userId).emit('message', { userId, message: text });
  }

  async sendMessageToBot({ userId, message }) {
    return await this.postMessageToBot({ userId: userId, message: message });
  }

  async sendActionToBot(action) {}

  async sendActionToUser(action) {}

  async prepareMsg(req, res) {}
};
