module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('MenuItem', {
            title: {
                type: DataTypes.STRING,
                defaultValue: 'somefood',
            },
            picture: {
                type: DataTypes.STRING,
                defaultValue: 'food picture',
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
                defaultValue: 'food description',
            },
            createdAt: {
                type: DataTypes.DATE,
            },
            updatedAt: {
                type: DataTypes.DATE,
            },
        });
    },
    down: async (queryInterface, DataTypes) => {
        await queryInterface.dropTable('MenuItem');
    },
};
