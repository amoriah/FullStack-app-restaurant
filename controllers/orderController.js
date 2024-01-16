const db = require('../db/models');
const { menuNames } = require('../mocks/menu_mock');

const Order = db.orders;
const Users = db.users;

const postOrder = async (req, res) => {
    console.log('\n[ route to postOrder ]\n');

    console.log('req.body', req.body);
    try {
        const items = req.body.dishes.map(dish => {
            return menuNames.indexOf(dish) + 1;
        });
        const user = await Users.findOne({
            where: {
                name: req.body.waiter,
            },
        });
        const orderInfo = {
            items: items,
            UserId: user.id,
        };
        const order = await Order.create(orderInfo);
        await user.update({ orders: [...user.dataValues.orders, order.id] });
        res.status(200).json(order.dataValues.id);
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось создать заказ',
        });
        console.log(`\n[ Error from postOrder ] -> ${err}\n`);
    }
};

const changeOrder = async (req, res) => {
    console.log('\n[ route to changeOrder ]\n');
    try {
        const id = req.params.id;
        const order = await Order.update(req.body, {
            where: { id: id },
        });
        res.status(200).send(order);
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось изменить заказ',
        });
        console.log(`\n[ Error from changeOrder ] -> ${err}\n`);
    }
};

const deleteOrder = async (req, res) => {
    console.log('\n[ route to deleteOrder ]\n');
    try {
        const order = await Order.findOne({
            where: {
                id: req.params.id,
            },
        });
        await order.update({ isActive: false });
        res.status(200).send(`[  Set order №${req.params.id} non active  ]`);
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось удалить заказ',
        });
        console.log(`\n[ Error from deleteOrder ] -> ${err}\n`);
    }
};

const getOrders = async (req, res) => {
    console.log('\n[ route to getOrders ]\n');
    try {
        const orders = await Order.findAll();
        res.status(200).send(orders);
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось получить список заказов',
        });
        console.log(`\n[ Error from getOrders ] -> ${err}\n`);
    }
};

module.exports = {
    postOrder,
    changeOrder,
    deleteOrder,
    getOrders,
};
