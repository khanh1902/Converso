const { intentService, nlp } = require('../services');

module.exports = {
  async getTrainData(req, res) {
    try {
      const { refId, text } = req.body;

      if (!refId || !text) throw new Error('Missing params!');

      let intent = await nlp.predict(refId, text);

      return res.send({ statusCode: 200, data: intent, message: 'Predicted!' });
    } catch (e) {
      console.log('Can not predict intent', e.message);
      return res.status(400).send({
        statusCode: 400,
        message: 'Can not predict intent! ' + (e && e.errors && e.errors.length && e.errors[0].message) || e.message,
        data: null,
      });
    }
  },
  async getTrainDataById(req, res) {
    try {
      const { id } = req.params;

      let intent = await intentService.getTrainById({ id });

      return res.send({ statusCode: 200, data: intent, message: 'Predicted!' });
    } catch (e) {
      return res.status(400).send({
        statusCode: 400,
        message: 'Can not predict intent! ' + (e && e.errors && e.errors.length && e.errors[0].message) || e.message,
        data: null,
      });
    }
  },
  async getTrainDataByUser(req, res) {
    try {
      const { decoded } = req.body;

      let intent = await intentService.getUserTrains({ userId: decoded.id });

      return res.send({ statusCode: 200, data: intent, message: 'Predicted!' });
    } catch (e) {
      return res.status(400).send({
        statusCode: 400,
        message: 'Can not predict intent! ' + (e && e.errors && e.errors.length && e.errors[0].message) || e.message,
        data: null,
      });
    }
  },
  async saveTrainData(req, res) {
    try {
      const { decoded, name, intents, entities, refId } = req.body;

      const userId = decoded && decoded.id;

      if (!userId || !name) throw new Error('Missing User id or Reference id!');

      let newIntent = await intentService.saveTrain({ referenceId: refId, name, intents, entities, userId });

      await nlp.train({ intents, refId: refId, entities });

      return res.send({ statusCode: 200, data: newIntent, message: 'Intent trained!' });
    } catch (e) {
      console.log('Train failed!', e.message);
      return res.status(400).send({
        statusCode: 400,
        message: 'Can not train new intent! ' + (e && e.errors && e.errors.length && e.errors[0].message) || e.message,
        data: null,
      });
    }
  },
  async deleteTrainData(req, res) {
    try {
      const { id } = req.params;

      await intentService.deleteTrain({ id });

      return res.send({ statusCode: 200, data: null, message: 'Delete intent trained!' });
    } catch (e) {
      console.log('Delete train failed!', e.message);
      return res.status(400).send({
        statusCode: 400,
        message: 'Can not delete train intent! ' + (e && e.errors && e.errors.length && e.errors[0].message) || e.message,
        data: null,
      });
    }
  },
};
