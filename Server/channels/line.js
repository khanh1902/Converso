const { default: axios } = require('axios');
const Provider = require('./base');
const { PUBLIC_DOMAIN } = process.env;

module.exports = class LineProvider extends Provider {
  constructor(providerData) {
    super(providerData);
    let { credentials, provider } = providerData;
    if (typeof credentials == 'string') credentials = JSON.parse(credentials);

    const { LineToken } = credentials;

    this.ChannelId = provider;
    this.LineToken = LineToken;
    this.MessengerPostURL = `https://api.line.me/v2`;

    this.registerWebhook();
    this.getUserId();
  }

  async registerWebhook() {
    try {
      await axios({
        method: 'PUT',
        url: 'https://api.line.me/v2/bot/channel/webhook/endpoint',
        data: { endpoint: PUBLIC_DOMAIN + '/webhook/' + this.ContactId },
        headers: {
          Authorization: `Bearer ${this.LineToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Registered webhook for LINE channel', this.ContactId);
    } catch (e) {
      console.log('Can not register webhook for LINE channel', this.ContactId);
    }
  }

  async getUserId() {
    try {
      const { data } = await axios({
        method: 'GET',
        url: 'https://api.line.me/v2/bot/info',
        headers: {
          Authorization: `Bearer ${this.LineToken}`,
        },
      });
      if (!data || !data.userId) throw new Error();

      this.LINE_USER_ID = data.userId;
      console.log(data.userId);
    } catch (e) {
      console.log('LINE can not get user id for ', this.ContactId);
    }
  }

  async sendMessageToUser({ userId, text }) {
    try {
      if (!text) return;

      const option = {
        method: 'POST',
        url: this.MessengerPostURL + '/bot/message/push',
        data: {
          to: userId,
          messages: [{ type: 'text', text }],
        },
        headers: {
          Authorization: 'Bearer ' + this.LineToken,
        },
      };

      await axios(option);
    } catch (e) {
      console.log('LNE send message to User failed');
    }
  }

  async sendMessageToBot(req, res) {}

  async prepareMsg(req, res) {
    const { destination, events } = req.body;

    if (!(events && events[0] && events[0].type == 'message')) return;

    if (destination == this.LINE_USER_ID) {
      const { message, source } = events[0];

      await this.postMessageToBot({ userId: source.userId, message: message.text });

      console.log(`LNE - Received message from sender ${this.LINE_USER_ID}: ${message.text}`);
    }
  }

  async sendActionToBot() {}

  async sendActionToUser({ userId, type }) {}
};
