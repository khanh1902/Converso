let router = require('express').Router();
const { flow, intent } = require('../controllers');

router.get('/flow/id/:id', flow.getFlowById);
router.get('/flow/:channelId', flow.getFlow);
router.post('/predict', intent.getTrainData);

module.exports = router;
