const { userService } = require('../services');

module.exports = {
  async register(req, res) {
    let { username, password, roleId = 2, name, avatar, phonenumber, email, address, extendData, slug } = req.body;
    try {
      let user = await userService.register({
        username,
        password,
        roleId,
        name,
        avatar,
        phonenumber,
        email,
        address,
        extendData,
        slug,
      });
      return res.send({ statusCode: 200, data: user, message: 'Register success!' });
    } catch (e) {
      console.log('Register failed!', e.message);
      return res.status(400).send({
        statusCode: 400,
        message: 'Register failed! ' + (e && e.errors && e.errors.length && e.errors[0].message) || e.message,
        data: null,
        error: (e && e.errors && e.errors.length && e.errors[0].message) || e.message,
      });
    }
  },
  async login(req, res) {
    let { username, password } = req.body;
    try {
      let user = await userService.login(username, password);
      return res.send({ statusCode: 200, data: user, message: 'Login success' });
    } catch (e) {
      return res.status(400).send({
        statusCode: 400,
        message: 'Login failed! ' + (e && e.errors && e.errors.length && e.errors[0].message) || e.message,
        data: null,
      });
    }
  },
};
