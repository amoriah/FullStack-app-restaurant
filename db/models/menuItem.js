module.exports = (sequelize, DataTypes) => {
    const menuItem = sequelize.define('MenuItem', {
        title: {
            type: DataTypes.STRING,
            defaultValue: 'блюдо',
        },
        picture: {
            type: DataTypes.STRING,
            defaultValue: 'изображение блюда',
        },
        cost: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
        callQuantity: {
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: 'описание блюда',
        },
    });

    return menuItem;
};
