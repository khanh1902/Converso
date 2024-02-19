const { flowService, channelService } = require('../services');
module.exports = {
  async createFlow(req, res) {
    try {
      const { name, flowType, decoded } = req.body;
      let newFlow = await flowService.createFlow({ name, flowType, userId: decoded && decoded.id });
      return res.send({ statusCode: 200, data: newFlow, message: 'Flow created!' });
    } catch (e) {
      return res.status(400).send({
        statusCode: 400,
        message: 'Can not get create flow! ' + ((e && e.errors && e.errors.length && e.errors[0].message) || e.message),
        data: null,
      });
    }
  },
  async editFlow(req, res) {
    try {
      const { id, name, status, edges, diagram, settings, attributes, publishedFlow, isPublished, decoded, test } = req.body;
      let savedFlow = await flowService.editFlow({
        test,
        id,
        name,
        status,
        diagram,
        settings,
        edges,
        attributes,
        publishedFlow,
        isPublished,
        userId: decoded.id,
      });
      return res.send({ statusCode: 200, data: savedFlow, message: 'Flow saved!' });
    } catch (e) {
      return res.status(400).send({
        statusCode: 400,
        message: `Can not edit flow! ${(e && e.errors && e.errors.length && e.errors[0].message) || e.message}`,
        data: null,
      });
    }
  },
  async deleteFlow(req, res) {
    try {
      const { id: flowId } = req.params;
      await flowService.deleteFlow({ flowId });
      return res.send({ statusCode: 200, message: 'Flow deleted successfully!', data: {} });
    } catch (e) {
      return res.status(400).send({
        statusCode: 400,
        message: 'Can not delete flow! ' + (e && e.errors && e.errors.length && e.errors[0].message) || e.message,
        data: null,
      });
    }
  },
  async getUserFlows(req, res) {
    try {
      const { decoded } = req.body;
      const flows = await flowService.getUserFlows({ userId: decoded.id });
      return await res.send({ statusCode: 200, message: '', data: flows });
    } catch (e) {
      return res.status(400).send({
        statusCode: 400,
        message: 'Can not get flow! ' + (e && e.errors && e.errors.length && e.errors[0].message) || e.message,
        data: null,
      });
    }
  },
  async getFlow(req, res) {
    try {
      const { channelId } = req.params;

      const channel = channelService.findChannel(channelId);

      if (!channel) return res.send(null);

      let flow = await flowService.getFlowById({ flowId: channel.flowId });
      return res.send(flow);
    } catch (e) {
      return res.status(400).send({
        statusCode: 400,
        message: `Can not get flow! ${(e && e.errors && e.errors.length && e.errors[0].message) || e.message}`,
        data: null,
      });
    }
  },
  async getUserFlowById(req, res) {
    try {
      const { id } = req.params;

      let flow = await flowService.getFlowById({ flowId: id });

      return res.send({ statusCode: 200, data: flow, message: '' });
    } catch (e) {
      return res.status(400).send({
        statusCode: 400,
        message: `Can not get flow! ${(e && e.errors && e.errors.length && e.errors[0].message) || e.message}`,
        data: null,
      });
    }
  },
  async getFlowById(req, res) {
    try {
      const { id } = req.params;

      let flow = await flowService.getFlowById({ flowId: id });

      return res.send({ statusCode: 200, data: flow, message: '' });
    } catch (e) {
      return res.status(400).send({
        statusCode: 400,
        message: `Can not get flow! ${(e && e.errors && e.errors.length && e.errors[0].message) || e.message}`,
        data: null,
      });
    }
  },
};
