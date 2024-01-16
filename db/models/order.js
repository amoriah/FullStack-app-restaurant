module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        items: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
        },
    });

    return Order;
};
