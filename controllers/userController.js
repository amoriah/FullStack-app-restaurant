const db = require('../db/models');

const User = db.users;

const addUser = async (req, res) => {
    console.log('\n[ route to addUser ]\n');
    const { name, role, login, password } = req.body;

    try {
        const user = await User.create({
            name,
            role,
            login,
            password,
        });
        res.status(200).send({ message: 'Пользователь создан', success: 1 });
    } catch (err) {
        console.log(`\n[ Error from addUser ] -> ${err}\n`);
        res.status(500).json({
            message: 'Не удалось создать пользователя',
            success: 0,
        });
    }
};

const loginUser = async (req, res) => {
    console.log('\n[ route to loginUser ]\n');
    const { login, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                login: login,
                password: password,
            },
        });
        if (!user) {
            res.status(404).send({
                message: 'Неверный пользователь',
                success: 0,
            });
        } else {
            req.app.locals.session = req.session;
            req.session.isAuth = true;
            req.session.user = user;
            req.session.role = user.role;
            req.session.save();
            res.set('Set-Cookie', `session=${req.session.id}`);
            res.status(200).send({
                message: 'Вход успешно выполнен',
                success: 1,
            });
        }
    } catch (err) {
        console.log(`\n[ Error from loginUser ] -> ${err}\n`);
        res.status(500).json({
            message: 'Не удалось авторизоваться',
            success: 0,
        });
    }
};

const logout = (req, res) => {
    console.log('\n[ route to logout ]\n');

    try {
        req.session.destroy();
        req.app.locals.session = null;
        res.status(200).send({
            message: 'Выход успешно выполнен',
            success: 1,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось выполнить выход',
            success: 0,
        });
    }
};

module.exports = {
    addUser,
    loginUser,
    logout,
};
