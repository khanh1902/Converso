let router = require('express').Router();
const { intent } = require('../controllers');

router.post('/predict', intent.getTrainData);
router.post('/train', intent.saveTrainData);
router.post('/delete/:id', intent.deleteTrainData);
router.get('/:id', intent.getTrainDataById);
router.get('/', intent.getTrainDataByUser);

module.exports = router;
