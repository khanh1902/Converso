const { BOT_ENDPOINT, PUBLIC_DOMAIN } = process.env;
const axios = require('axios');

module.exports = class Provider {
  constructor(providerData) {
    let { contactId, provider, contactName, id, flowId } = providerData;

    this.Id = id;
    this.ContactId = contactId;
    this.ContactName = contactName;
    this.Provider = provider;
    this.flowId = flowId;
    console.log(`Init channel ${provider} - ${contactName} ${contactId}`);
  }

  async postMessageToBot({ userId, message = '', data }) {
    try {
      const uid = this.genConversationId(userId);
      await axios({
        method: 'POST',
        url: BOT_ENDPOINT,
        data: {
          conversation: {
            id: uid,
          },
          from: {
            id: userId,
          },
          recipient: {
            id: this.ContactId,
          },
          data: data || false,
          text: message,
          type: 'message',
          id: uid,
          channelId: this.Provider,
          serviceUrl: 'https://converso.site/api',
        },
      });
    } catch (e) {
      console.log(`Can not send message to bot!`, userId, message);
      console.log(e.message);
    }
  }

  async postDataToBot({ userId, data }) {
    try {
      const uid = this.genConversationId(userId);
      await axios({
        method: 'POST',
        url: BOT_ENDPOINT,
        data: {
          conversation: {
            id: uid,
          },
          from: {
            id: userId,
          },
          recipient: {
            id: this.ContactId,
          },
          type: 'event',
          name: 'payload',
          data,
          id: uid,
          channelId: this.Provider,
          serviceUrl: 'http://localhost:3000/api',
        },
      });
    } catch (e) {
      console.log(`Can not send data to bot!`, userId);
      console.log(e.message);
    }
  }

  async postMessageToUser(message) {}

  genConversationId(userId) {
    return this.ContactId + '-' + userId;
  }
};
