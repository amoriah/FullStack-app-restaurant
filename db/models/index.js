const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../../config/dbConfig');

const sequelize = new Sequelize(
    dbConfig.development.database,
    dbConfig.development.username,
    dbConfig.development.password,
    {
        host: dbConfig.development.host,
        port: dbConfig.development.port,
        dialect: dbConfig.development.dialect,
        operatorsAliases: false,
    },
);

sequelize
    .authenticate()
    .then(() => {
        console.log(
            `          [  CONNECTED WITH DB ${dbConfig.development.database}]`,
        );
    })
    .catch(err => {
        console.log('          [  CONNECTED WITH DB:ERROR! ]: ' + err);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user')(sequelize, DataTypes);
db.orders = require('./order')(sequelize, DataTypes);
db.menuItems = require('./menuItem')(sequelize, DataTypes);

db.users.hasMany(db.orders, {
    foreignKey: 'orders',
    onDelete: 'cascade',
});
db.orders.belongsTo(db.users);

db.orders.hasMany(db.menuItems, {
    foreignKey: 'items',
    onDelete: 'cascade',
});
db.menuItems.belongsTo(db.orders);

db.sequelize.sync({ force: false }).then(res => {
    console.log('          [  SYNC DONE  ]');
});

module.exports = db;
