const { Flow } = require('../models');
const { checkFlowType, handleFlowData } = require('../utils/utils');

async function createFlow({ name, flowType, userId }) {
  if (!checkFlowType(flowType)) throw new Error('Not support this channel type');

  let newFlow = await Flow.create({
    name,
    flowType,
    diagram: [],
    flow: [],
    settings: [],
    attributes: [],
    edges: [],
    userId,
  });

  if (!newFlow) throw new Error("Couldn't create channel!");
  return newFlow;
}

async function getAllFlow() {
  return await Flow.findAll({ where: { Active: true }, raw: true });
}

async function getFlowById({ flowId }) {
  return await Flow.findOne({ where: { id: flowId } });
}

async function getUserFlows({ userId }) {
  return await Flow.findAll({ where: { userId } });
}

async function editFlow({
  id,
  name,
  status,
  diagram,
  edges,
  settings,
  attributes,
  publishedFlow,
  isPublished,
  userId,
  test,
}) {
  let findFlow = await Flow.findOne({ where: { id: id, userId } });
  if (!findFlow) throw new Error("Couldn't find flow!");

  const flow = (test && diagram) || handleFlowData(diagram);

  findFlow.set(
    JSON.parse(
      JSON.stringify({
        ...findFlow,
        name,
        status,
        diagram,
        flow,
        edges,
        settings,
        attributes,
        publishedFlow,
        isPublished,
      })
    )
  );

  await findFlow.save();
  return findFlow;
}

async function deleteFlow({ flowId }) {
  let findFlow = await Flow.findOne({ where: { id: flowId } });
  if (!findFlow) throw new Error("Couldn't find flow!");

  await findFlow.destroy();

  console.log('Removed flow id :', flowId);
}

module.exports = {
  createFlow,
  getAllFlow,
  getFlowById,
  editFlow,
  deleteFlow,
  getUserFlows,
};
