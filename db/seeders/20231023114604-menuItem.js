module.exports = {
    up: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkInsert('MenuItem', [
            {
                title: 'блюдо',
                picture: 'изображение блюда',
                cost: 0,
                callQuantity: 0,
                description: 'описание блюда',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete('MenuItem', null, {});
    },
};
