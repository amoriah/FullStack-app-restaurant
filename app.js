const cors = require('cors');
const session = require('express-session');
const express = require('express');
const PORT = process.env.PORT || 3001;
const { router, checkoutAuth } = require('./routes/routes.js');
const db = require('./db/models');
const Users = db.users;
const Orders = db.orders;
const sequelize = db.sequelize;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express()
    .set('trust proxy', 1)
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(
        session({
            secret: 'secret-key',
            store: new SequelizeStore({
                db: sequelize,
            }),
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: true,
            },
        }),
    )
    .use('/api', router);

app.get('/', checkoutAuth, async (req, res) => {
    console.log('after checkAuth');
    try {
        const users = await Users.findAll({});
        const orders = await Orders.findAll({});
        res.status(200).send({
            users,
            orders,
            success: 1,
            session: req.app.locals.session.user,
        });
    } catch (err) {
        console.log('[ ERROR from / ] -> ', err);
        res.status(500).send({ success: 0 });
    }
});

app.listen(PORT, () => {
    console.log(`          [  SERVER IS RUNNING on port ${PORT}]`);
});
