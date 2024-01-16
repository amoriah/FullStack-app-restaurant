module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('User', {
            name: {
                type: DataTypes.STRING,
            },
            orders: {
                type: DataTypes.ARRAY(DataTypes.INTEGER),
            },
            role: {
                type: DataTypes.STRING,
            },
            login: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
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
        await queryInterface.dropTable('User');
    },
};
