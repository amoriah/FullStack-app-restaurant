module.exports = {
    up: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkInsert('User', [
            {
                name: 'Яна Амориа',
                orders: [0],
                role: 'admin',
                login: 'login',
                password: 'username',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete('User', null, {});
    },
};
