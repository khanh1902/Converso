let router = require('express').Router();
const { flow } = require('../controllers');

router.post('/create', flow.createFlow);
router.post('/edit', flow.editFlow);
router.post('/delete/:id', flow.deleteFlow);
router.get('/my-flows', flow.getUserFlows);
router.get('/:id', flow.getUserFlowById);

module.exports = router;
