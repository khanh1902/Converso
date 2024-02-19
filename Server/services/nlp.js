const { NlpManager } = require('node-nlp');
const fs = require('fs');
const path = require('path');

const train = async ({ intents, refId, entities }) => {
  const manager = new NlpManager({ languages: ['en'], nlu: { log: false } });

  if (!Array.isArray(intents)) throw new Error('Invalid intents');

  intents.forEach((item) => {
    const { intent, prompts } = item;

    if (!intent && !Array.isArray(prompts)) return;

    prompts.forEach((prompt) => {
      manager.addDocument('en', prompt, intent);
    });
  });

  await manager.train();
  await manager.save(path.join(process.cwd(), `\/train_data\/${refId}.json`));
  console.log(path.join(process.cwd(), `\/train_data\/${refId}.json`));
  console.log('Trained for ' + refId + ' successfully');
};

const predict = async (refId, text) => {
  const manager = new NlpManager({ languages: ['en'], nlu: { log: false } });

  if (!fs.existsSync(path.join(process.cwd(), `\/train_data\/${refId}.json`))) throw new Error(`Found no references!`);

  await manager.load(path.join(process.cwd(), `\/train_data\/${refId}.json`));

  let result = await manager.process('en', text);

  if (!result) return {};

  return result.intent;
};

module.exports = {
  train,
  predict,
};
