const { channelService } = require('../services');

module.exports = {
  verifyWebhook(req, res) {
    let expectedChannel = channelService.findChannel(req.params.id);
    if (!expectedChannel) {
      console.log('Can not found any channel with id', req.params.id);
      return res.sendStatus(400);
    }
    return expectedChannel.verifyWebhook(req, res);
  },
  async handleIncomingMessage(req, res) {
    res.sendStatus(200);

    let expectedChannel = channelService.findChannel(req.params.id);

    if (!expectedChannel) {
      console.log('Incoming message : Can not find channel with id ', req.params.id);
      return;
    }

    return await expectedChannel.prepareMsg(req, res);
  },
};
