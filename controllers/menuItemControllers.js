const db = require('../db/models');
const { menuNames } = require('../mocks/menu_mock');

const MenuItem = db.menuItems;

const getMenu = async (req, res) => {
    console.log('\n[ route to getMenu ]\n');
    try {
        const menuItems = await MenuItem.findAll({});
        res.status(200).send({ menuItems, menuNames });
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось получить меню',
        });
        console.log(`\n[ Error from getMenu ] -> ${err}\n`);
    }
};

module.exports = {
    getMenu,
};
