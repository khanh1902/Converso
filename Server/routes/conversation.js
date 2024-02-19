let router = require('express').Router();
const { conversation } = require('../controllers');

router.post('/:conversationId/activities/:activity', conversation.handleIncomingMessages);
router.post('/:conversationId/activities', conversation.handleIncomingMessages);

module.exports = router;
