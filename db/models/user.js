  module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            defaultValue: 'Anonim',
        },
        orders: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            defaultValue: [],
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'waiter',
        },
        login: {
            type: DataTypes.STRING,
            unique: true,
            require: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            unique: true,
            require: true,
            allowNull: false,
        },
    });

    return User;
};
