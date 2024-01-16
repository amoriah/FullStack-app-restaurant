const controllers = require('../controllers/index');
const router = require('express').Router();

const checkoutAuth = (req, res, next) => {
    try {
        if (req.app.locals.session.isAuth) next();
    } catch (err) {
        return res.status(200).send({
            redirectUrl: '/api/signin',
        });
    }
};

// -----------------------auth-----------------------

router.post('/addUser', controllers.userController.addUser);
router.post('/loginUser', controllers.userController.loginUser);
router.get('/logout', controllers.userController.logout);

// -----------------------order-----------------------

router.post('/orders', checkoutAuth, controllers.orderController.postOrder);
router.put(
    '/orders/:id',
    checkoutAuth,
    controllers.orderController.changeOrder,
);
router.delete(
    '/orders/:id',
    checkoutAuth,
    controllers.orderController.deleteOrder,
);
router.get('/orders', checkoutAuth, controllers.orderController.getOrders);

// -----------------------menu-----------------------

router.get('/menu', controllers.menuItemController.getMenu);

module.exports = { router, checkoutAuth };
