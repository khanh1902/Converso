const { default: axios } = require('axios');
const Provider = require('./base');
const { arrayToObj } = require('../utils/utils');

module.exports = class MessengerProvider extends Provider {
  constructor(providerData) {
    super(providerData);
    let { credentials, provider } = providerData;
    if (typeof credentials == 'string') credentials = JSON.parse(credentials);

    const { PageToken, WebhookSecret } = credentials;

    this.ChannelId = provider;
    this.PageToken = PageToken;
    this.WebhookSecret = WebhookSecret;
    this.MessengerPostURL = `https://graph.facebook.com/v18.0/me/messages?access_token=`;
  }

  verifyWebhook(req, res) {
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && this.WebhookSecret == token) {
      console.log('Facebook webhook verified!');
      return res.status(200).send(challenge);
    } else {
      console.error('Verification Failed');
      return res.sendStatus(403);
    }
  }

  async sendMessageToUser({ userId, text, buttons }) {
    if (buttons && buttons.length) return this.sendButtons({ userId, text, buttons });
    if (!text) return;

    try {
      await axios({
        method: 'POST',
        url: `https://graph.facebook.com/v14.0/me/messages?access_token=${this.PageToken}`,
        data: {
          messaging_type: 'RESPONSE',
          recipient: {
            id: userId,
          },
          message: { text },
        },
      });
      console.log(`Sent: ${text} to ${userId}`);
    } catch (e) {
      console.log(this.ContactId, 'Can not send message to facebook', e.message);
    }
  }

  async sendMessageToBot(req, res) {}

  async prepareMsg(req, res) {
    const { object, entry } = req.body;

    if (object != 'page' || !Array.isArray(entry)) return;

    entry.forEach((pageEntry) => {
      if (!Array.isArray(pageEntry.messaging)) return;

      pageEntry.messaging.forEach(async (messagingEvent) => {
        if (messagingEvent.messaging_customer_information)
          return this.sendAddressToBot({
            userId: messagingEvent.sender.id,
            address: messagingEvent.messaging_customer_information.screens[0].responses,
          });

        if (!messagingEvent.message && !messagingEvent.postback) return;

        const senderId = messagingEvent.sender.id;
        const messageText = messagingEvent.message && messagingEvent.message.text;
        const payload = messagingEvent.postback && messagingEvent.postback.payload;
        const quick_reply = messagingEvent.message && messagingEvent.message.quick_reply;
        if (senderId == this.ContactId) {
          //Agent replied to user => skip
          return;
        }

        return this.postMessageToBot({ userId: senderId, message: messageText || payload });
      });
    });
  }

  async sendActionToBot() {}

  async sendActionToUser({ userId, type }) {
    const types = {
      typing: 'TYPING_ON',
    };

    if (!types[type]) return;

    try {
      await axios({
        method: 'POST',
        url: `https://graph.facebook.com/v14.0/me/messages?access_token=${this.PageToken}`,
        data: {
          messaging_type: 'RESPONSE',
          recipient: {
            id: userId,
          },
          sender_action: types[type],
        },
      });
    } catch (e) {
      console.log('MSG Can not send action to user', e.message);
    }
  }

  async sendButtonWebURL() {
    try {
      console.log('Send button web url');
      await axios({
        method: 'POST',
        url: `https://graph.facebook.com/v17.0/me/messages?access_token=${this.PageToken}`,
        data: {
          recipient: {
            id: '6006255876057507',
          },
          message: {
            attachment: {
              type: 'template',
              payload: {
                template_type: 'button',
                text: 'Button visit web site',
                buttons: [
                  {
                    type: 'web_url',
                    title: 'Visits',
                    url: 'https://converso.site/',
                  },
                ],
              },
            },
          },
        },
      });
    } catch (error) {
      console.log();
    }
  }

  async sendButtonPostBack() {
    try {
      console.log('Send button post back');
      await axios({
        method: 'POST',
        url: `https://graph.facebook.com/v17.0/me/messages?access_token=${this.PageToken}`,
        data: {
          recipient: {
            id: '6006255876057507',
          },
          message: {
            attachment: {
              type: 'template',
              payload: {
                template_type: 'button',
                text: 'Button post back',
                buttons: [
                  {
                    type: 'postback',
                    title: 'Start Chatting',
                    payload: 'DEVELOPER_DEFINED_PAYLOAD',
                  },
                ],
              },
            },
          },
        },
      });
    } catch (error) {
      console.log();
    }
  }

  async sendButtonCall() {
    try {
      console.log('Send button call');
      await axios({
        method: 'POST',
        url: `https://graph.facebook.com/v17.0/me/messages?access_token=${this.PageToken}`,
        data: {
          recipient: {
            id: '6006255876057507',
          },
          message: {
            attachment: {
              type: 'template',
              payload: {
                template_type: 'button',
                text: 'Button call',
                buttons: [
                  {
                    type: 'phone_number',
                    title: 'Call',
                    payload: '+84789512936',
                  },
                ],
              },
            },
          },
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async sendButtons({ userId, buttons, message, text }) {
    try {
      await axios({
        method: 'POST',
        url: `https://graph.facebook.com/v17.0/me/messages?access_token=${this.PageToken}`,
        data: {
          recipient: {
            id: userId,
          },
          message: {
            attachment: {
              type: 'template',
              payload: {
                template_type: 'button',
                text: text,
                buttons: buttons,
              },
            },
          },
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async sendTemplate({ userId, channelData, type }) {
    if (!channelData) return;

    const template = {
      address_template: ({ userId, channelData }) => this.sendAddressTemplate({ userId, channelData }),
      template: ({ userId, channelData }) => this.sendGenericTemplate({ userId, channelData }),
      receipt: ({ userId, channelData }) => this.sendReceipt({ userId, channelData }),
    };

    return template[type]({ userId, channelData });
  }

  async sendReceipt({ userId, channelData }) {
    try {
      await axios({
        method: 'POST',
        url: `https://graph.facebook.com/v2.6/me/messages?access_token=${this.PageToken}`,
        data: {
          recipient: {
            id: userId,
          },
          message: {
            attachment: {
              type: 'template',
              payload: {
                ...channelData,
                template_type: 'receipt',
                timestamp: Math.floor(Date.now() / 1000),
                address: channelData.address,
                summary: channelData.summary,
                adjustments: [
                  // {
                  //   name: 'New Customer Discount',
                  //   amount: 20,
                  // },
                  // {
                  //   name: '$10 Off Coupon',
                  //   amount: 10,
                  // },
                ],
                elements: channelData.elements,
              },
            },
          },
        },
      });
    } catch (error) {
      console.error('Send template error: ' + error.message);
      console.error(error);
    }
  }

  async sendGenericTemplate({ userId, channelData }) {
    try {
      await axios({
        method: 'POST',
        url: `https://graph.facebook.com/v17.0/me/messages?access_token=${this.PageToken}`,
        data: {
          recipient: {
            id: userId,
          },
          message: {
            attachment: {
              type: 'template',
              payload: {
                template_type: 'generic',
                elements: channelData.extend,
              },
            },
          },
        },
      });
    } catch (error) {
      console.error('sendGenericTemplate error: ' + error.message);
      console.error(error);
    }
  }

  async sendAddressTemplate({ userId, channelData = {} }) {
    if (channelData.text) await this.sendMessageToUser({ userId, text: channelData.text });

    try {
      await axios({
        method: 'POST',
        url: `https://graph.facebook.com/v18.0/me/messages?access_token=` + this.PageToken,
        data: {
          recipient: {
            id: userId,
          },
          message: {
            attachment: {
              type: 'template',
              payload: {
                template_type: 'customer_information',
                countries: ['VN'],
                business_privacy: {
                  url: 'https://www.facebook.com/privacy/explanation',
                },
                expires_in_days: 1,
              },
            },
          },
        },
      });
    } catch (e) {
      console.log(`Send address template failed`, e.message);
      console.log(e.stack);
    }
  }

  sendAddressToBot({ userId, address }) {
    return this.postMessageToBot({ userId, message: 'ADDRESS', data: { USER_INFORMATION: arrayToObj(address) } });
  }
};
