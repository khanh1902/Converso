const { Intent } = require('../models');
const fs = require('fs');

async function saveTrain({ referenceId, name, intents, entities, userId }) {
  const trained = await Intent.findOne({ where: { referenceId } });

  // create
  if (!trained) {
    const train = await Intent.create({ referenceId, name, intents, entities, userId });
    return train;
  }

  // update
  trained.set(JSON.parse(JSON.stringify({ ...trained, name, intents, entities })));

  await trained.save();

  return trained;
}

async function deleteTrain({ id }) {
  const trainData = await Intent.findOne({ where: { id } });

  if (!trainData) throw new Error("Couldn't found intent");

  if (!fs.existsSync(`.\\train_data\\${trainData.referenceId}.json`)) throw new Error(`Found no references!`);

  fs.unlinkSync(`.\\train_data\\${trainData.referenceId}.json`, function (err) {
    if (err) throw new Error(`Couldn't delete intent file`);
  });

  await trainData.destroy();
}

async function getTrain({ id }) {
  return await Intent.findOne({ where: { referenceId: id } });
}

async function getTrainById({ id }) {
  return await Intent.findOne({ where: { id } });
}

async function getUserTrains({ userId }) {
  let intent = await Intent.findAll({ where: { userId } });

  if (!intent) return;

  return intent;
}

module.exports = {
  saveTrain,
  deleteTrain,
  getTrain,
  getUserTrains,
  getTrainById,
};
