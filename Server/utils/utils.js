module.exports = {
  handleFlowData(diagram) {
    if (!Array.isArray(diagram)) return [];
    let result = [];

    result = diagram.map((e) => e.data);

    return result;
  },
  checkFlowType(type) {
    return ['MSG', 'WEB', 'LNE'].includes(type);
  },
  arrayToObj(arr) {
    const obj = {};
    arr.forEach((item) => {
      obj[item.key] = item.value;
    });
    return obj;
  },
};
