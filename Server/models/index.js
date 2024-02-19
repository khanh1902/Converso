const Sequelize = require('sequelize');

const { DATABASE_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DATABASE_NAME, DB_USERNAME, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('DB Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

const Channel = require('./channel')(sequelize);
const User = require('./user')(sequelize);
const Flow = require('./flow')(sequelize);
const Order = require('./order')(sequelize);
const OrderDetails = require('./orderdetails')(sequelize);
const Customer = require('./customer')(sequelize);
const Product = require('./product')(sequelize);
const Feedback = require('./feedback')(sequelize);
const ChannelType = require('./channeltype')(sequelize);
const Intent = require('./intent')(sequelize);
const Role = require('./role')(sequelize);

// User
Role.hasOne(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

// Flow
User.hasMany(Flow, { foreignKey: 'userId' });
Flow.belongsTo(User, { foreignKey: 'userId' });

// Channel
// Flow.hasMany(Channel, {foreignKey: 'flowId'});
// Channel.belongsTo(Flow, {foreignKey: 'id'});

User.hasMany(Channel, { foreignKey: 'userId' });
Channel.belongsTo(User, { foreignKey: 'userId' });

// ChannelType.hasMany(Channel, {foreignKey: 'channelTypeId'});
// Channel.belongsTo(ChannelType, {foreignKey: 'id'})

module.exports = {
  ChannelType,
  sequelize,
  Channel,
  User,
  Flow,
  Order,
  OrderDetails,
  Customer,
  Product,
  Feedback,
  Intent,
  Role,
};
