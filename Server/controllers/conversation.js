const { channelService } = require('../services');

module.exports = {
  async handleIncomingMessages(req, res) {
    res.send({});

    const { from, recipient, text, type, channelData } = req.body;

    const channel = channelService.findChannel(from.id);

    if (!channel) return console.log('Can not find channel to send to user!');

    if (type == 'message')
      return await channel.sendMessageToUser({ userId: recipient.id, text, buttons: channelData && channelData.buttons });

    if (['typing', 'stop-typing'].includes(type)) return await channel.sendActionToUser({ userId: recipient.id, type });

    return await channel.sendTemplate({ userId: recipient.id, channelData, text, type });
  },
};
