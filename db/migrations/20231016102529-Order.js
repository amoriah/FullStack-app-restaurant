module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('Order', {
            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            items: {
                type: DataTypes.ARRAY(DataTypes.INTEGER),
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
        await queryInterface.dropTable('Order');
    },
};
