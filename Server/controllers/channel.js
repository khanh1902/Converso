const { channelService, channelTypeService } = require('../services');
module.exports = {
  async createChannel(req, res) {
    const { decoded, contactId, contactName, channelTypeId, credentials } = req.body;
    try {
      let newChannel = await channelService.createChannel({
        userId: decoded && decoded.id,
        contactId,
        contactName,
        channelTypeId,
        credentials,
      });
      return res.send({ statusCode: 200, data: newChannel, message: 'Channel created!' });
    } catch (e) {
      console.log('Create channel failed!', e.message);
      return res.status(400).send({
        statusCode: 400,
        message: 'Can not create channel! ' + (e && e.errors && e.errors.length && e.errors[0].message) || e.message,
        data: null,
      });
    }
  },
  async getAllChannels(req, res) {
    try {
      let channels = await channelService.getAllChannels();
      return res.send({ statusCode: 200, data: channels, message: '' });
    } catch (e) {
      return res.status(400).send({
        statusCode: 400,
        message: 'Can not get channels! ' + (e && e.errors && e.errors.length && e.errors[0].message) || e.message,
        data: null,
      });
    }
  },
  async getChannelsByUser(req, res) {
    const { decoded } = req.body;
    try {
      let channels = await channelService.getChannelsByUser(decoded.id);
      return res.send({ statusCode: 200, data: channels, message: '' });
    } catch (e) {
      return res.status(400).send({
        statusCode: 400,
        message: 'Can not get channels! ' + (e && e.errors && e.errors.length && e.errors[0].message) || e.message,
        data: null,
      });
    }
  },
  async getChannelById(req, res) {
    // const { decoded } = req.body;
    const { channelId } = req.params;

    if (!channelId) {
      return res.status(400).send({
        statusCode: 400,
        message: 'Can not get channels! Missing channel id!',
        data: null,
      });
    }

    try {
      let channel = await channelService.getChannelById(channelId);
      return res.send({ statusCode: 200, data: channel, message: '' });
    } catch (e) {
      return res.status(400).send({
        statusCode: 400,
        message: 'Can not get channel! ' + (e && e.errors && e.errors.length && e.errors[0].message) || e.message,
        data: null,
      });
    }
  },
  async editChannel(req, res) {
    const { decoded, contactId, contactName, channelTypeId, credentials, active, flowId } = req.body;
    const { channelId } = req.params;

    if (!channelId)
      return res.status(400).send({
        statusCode: 400,
        message: 'Can not edit channels! Missing channel id!',
        data: null,
      });

    try {
      const channel = await channelService.editChannel({
        userId: decoded.id,
        channelId,
        contactId,
        contactName,
        channelTypeId,
        credentials,
        active,
        flowId,
      });
      return res.send({ statusCode: 200, data: channel, message: '' });
    } catch (e) {
      return res.status(400).send({
        statusCode: 400,
        message: 'Can not edit channel! ' + (e && e.errors && e.errors.length && e.errors[0].message) || e.message,
        data: null,
      });
    }
  },
  async deleteChannel(req, res) {
    const { decoded } = req.body;
    const { channelId } = req.params;

    try {
      await channelService.deleteChannel({ userId: decoded.id, channelId });
      return res.send({ statusCode: 200, data: {}, message: 'Channel deleted!' });
    } catch (e) {
      return res.status(400).send({
        statusCode: 400,
        message: 'Can not delete channel! ' + (e && e.errors && e.errors.length && e.errors[0].message) || e.message,
        data: null,
      });
    }
  },
  async getTypes(req, res) {
    try {
      let types = await channelTypeService.getTypes();
      return res.send({ statusCode: 200, data: types, message: '' });
    } catch (e) {
      return res.status(400).send({
        statusCode: 400,
        message: 'Can not get channel types! ' + (e && e.errors && e.errors.length && e.errors[0].message) || e.message,
        data: null,
      });
    }
  },
};
