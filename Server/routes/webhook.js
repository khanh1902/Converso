let router = require('express').Router();
const { webhook } = require('../controllers');

// /api/webhook/:id
router.get('/:id', webhook.verifyWebhook);
router.post('/:id', webhook.handleIncomingMessage);

module.exports = router;
