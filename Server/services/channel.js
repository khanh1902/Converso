const { sequelize, Channel, ChannelType, Role } = require('../models');

sequelize.sync().then(async () => {
  try {
    await ChannelType.bulkCreate([
      { name: 'WEB', icon: '', description: 'Web' },
      { name: 'MSG', icon: '', description: 'Messenger' },
      { name: 'LNE', icon: '', description: 'Line' },
    ]);
    console.log(`Channel types created`);

  } catch (e) {
    console.log(`Can't create channel types`);

  }

  try {
    await Role.bulkCreate([
      { name: 'ADMIN' },
      { name: 'USER' },
    ]);
    console.log(`Role created`);

  } catch (e) {
    console.log(`Can't create roles`)
  }

  initChannels();
});

let channels = [];

async function createChannel({ userId, contactId, contactName, channelTypeId, credentials }) {
  let newChannel = await Channel.create({ contactId, contactName, channelTypeId, credentials, userId });

  if (!newChannel) throw new Error("Couldn't create channel!");

  newChannel = initChannel(newChannel);

  channels.push(newChannel);

  return newChannel;
}

async function getChannelsByUser(userId) {
  return await Channel.findAll({ where: { userId } });
}

async function getChannelById(channelId) {
  return await Channel.findOne({ where: { id: channelId } });
}

async function editChannel({ userId, channelId, contactId, contactName, channelTypeId, credentials, active, flowId }) {
  let channel = await Channel.findOne({ where: { id: channelId, userId } });

  if (!channel) throw new Error("Couldn't find channel!");

  channel.set(
    JSON.parse(
      JSON.stringify({
        ...channel,
        contactId,
        contactName,
        channelTypeId,
        credentials,
        active,
        flowId,
      })
    )
  );

  updateChannel(channelId, channel);

  await channel.save();

  return channel;
}

async function deleteChannel({ userId, channelId }) {
  let channel = await Channel.findOne({ where: { id: channelId, userId } });

  if (!channel) throw new Error("Couldn't find channel!");

  await channel.destroy();

  channels = channels.filter((e) => e.ContactId !== channelId);

  console.log('Removed channel id :', channelId);
}

async function getAllChannels() {
  return await Channel.findAll({ where: { Active: true }, raw: true });
}

function initChannel(channel) {
  const { WebProvider, MessengerProvider, LineProvider } = require('../channels');
  const { channelTypeId } = channel;
  switch (channelTypeId) {
    case 1:
      channel.provider = 'WEB';
      return new WebProvider(channel);
    case 2:
      channel.provider = 'MSG';
      return new MessengerProvider(channel);
    case 3:
      channel.provider = 'LNE';
      return new LineProvider(channel);
    default:
      console.log(`Does not support channel type ${channelTypeId}`);
      break;
  }
}

const findChannel = (id) => channels.find((c) => c.ContactId == id);

const updateChannel = (id, data) => {
  let i = channels.findIndex((e) => e.Id == id);

  if (i < 0) return initChannel(data);

  channels.splice(i, 1);

  let newChannel = initChannel(data);

  channels.push(newChannel);
};

async function initChannels() {
  let contacts = await getAllChannels();

  contacts.forEach((c) => {
    let channel = initChannel(c);
    if (channel) channels.push(channel);
  });
}

module.exports = {
  channels,
  initChannels,
  findChannel,
  createChannel,
  getAllChannels,
  getChannelsByUser,
  getChannelById,
  editChannel,
  deleteChannel,
};
