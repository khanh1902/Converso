const { ChannelType } = require('../models');

module.exports = {
  async getTypes() {
    return await ChannelType.findAll({ attributes: { exclude: ['updatedAt', 'createdAt'] } });
  },
};
