const { AUTHENTICATE_TOKEN, AUTHORIZATION } = process.env;
const jwt = require('jsonwebtoken');

module.exports = {
  authorize(req, res, next) {
    let { authorization } = req.headers;
    if (authorization.includes('Bearer ')) {
      try {
        let decoded = jwt.verify(authorization.replace('Bearer ', ''), AUTHENTICATE_TOKEN);
        if (decoded && decoded.role != 1) throw new Error('Invalid authorization');
        return next();
      } catch (e) {
        return res.sendStatus(401);
      }
    }
    if (authorization != AUTHORIZATION) return res.sendStatus(401);
    return next();
  },
  authenticate(req, res, next) {
    let { authorization } = req.headers;

    let decoded;

    try {
      decoded = jwt.verify(authorization.replace('Bearer ', ''), AUTHENTICATE_TOKEN);
    } catch (err) {
      return res.status(400).send({ message: 'Authenticate Error', error: 'Invalid authorization' });
    }

    req.body.decoded = decoded;

    return next();
  },
};
