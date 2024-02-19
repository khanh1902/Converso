const { sequelize, User } = require('../models');
const jwt = require('jsonwebtoken');
const { AUTHENTICATE_TOKEN } = process.env;

module.exports = {
  async register({ username, password, roleId = 2, name, avatar, phonenumber, email, address, extendData, slug }) {
    let newUser = await User.create({
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

    if (!newUser) throw new Error('Could not register user!');

    newUser = newUser.get({ plain: true });
    delete newUser.password;

    let userData = {
      ...newUser,
      token: jwt.sign(newUser, AUTHENTICATE_TOKEN),
    };

    return userData;
  },
  async login(username, password) {
    let user = await User.findOne({
      where: {
        username: username,
        password: password,
      },
      raw: true,
    });

    if (!user) throw new Error('Wrong username or password!');

    delete user.password;

    let userData = {
      ...user,
      token: jwt.sign(user, AUTHENTICATE_TOKEN),
    };

    return userData;
  },
  async getUser(username) {
    return await User.findOne({
      where: {
        username: username,
      },
    });
  },
};
