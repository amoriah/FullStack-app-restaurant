module.exports = {
    up: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkInsert('Order', [
            {
                isActive: false,
                items: [0],
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete('Order', null, {});
    },
};
