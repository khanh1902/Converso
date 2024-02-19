let router = require('express').Router();
const { channel } = require('../controllers');

router.post('/create', channel.createChannel);
router.get('/my-channels', channel.getChannelsByUser);
router.get('/get-one/:channelId', channel.getChannelById);
router.get('/types', channel.getTypes);
router.post('/edit/:channelId', channel.editChannel);
router.post('/delete/:channelId', channel.deleteChannel);

module.exports = router;
