import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../Header';
import { baseURL, menuNames } from '../../../constants';
import * as Styles from './MainPage.styles';
import * as CommonStyles from '../Common.styles';

export const MainPage = () => {
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [waiterOrders, setWaiterOrders] = useState([]);
    const [formView, setFormView] = useState(true);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const header = {
        true: 'Официант ' + name + '. Все заказы',
        false: 'Официант ' + name + '. Нет заказов',
    };

    const getOrders = (user, orders) => {
        setOrders(orders);
        const waiterOrders = orders.filter(order => order.UserId === user.id);
        setWaiterOrders(waiterOrders);
        formViewHandle(!formView);
    };

    useEffect(() => {
        fetch(baseURL, {
            credentials: 'same-origin',
        }).then(async res => {
            const responce = await res.json();
            const userSession = responce.session;
            const orders = responce.orders;
            setOrders(orders);
            if (responce.redirectUrl) {
                navigate(responce.redirectUrl);
            } else if (!responce.success) {
                navigate('/api/orders/error');
            } else if (userSession.role === 'waiter') {
                nameHandle(userSession.name);
                getOrders(userSession, orders);
                setRole(userSession.role);
            }
            setUsers(responce.users);
        });
        // eslint-disable-next-line
    }, [navigate]);

    const searchHandle = event => {
        event.preventDefault();
        const user = users.find(u => u.name === name);
        getOrders(user, orders);
    };

    const nameHandle = name => {
        setName(name);
    };

    const formViewHandle = () => {
        setFormView(!formView);
    };

    const chooseOrderHandle = id => {
        if (!role) {
            return;
        }
        navigate(`/api/orders/${id}`);
    };

    const optionUsers = users
        .filter(u => u.role !== 'admin')
        .map(e => (
            <CommonStyles.Option
                key={e.name}
                value={e.name}>
                {e.name}
            </CommonStyles.Option>
        ));

    const articleOrders = waiterOrders
        .filter(order => order.isActive)
        .map(order => (
            <CommonStyles.Article
                key={order.id}
                onClick={e => chooseOrderHandle(order.id)}>
                <p>{'Заказ №' + order.id}</p>
                <Styles.Ul>
                    {order.items.map(id => (
                        <Styles.Li key={id}>{menuNames[id]}</Styles.Li>
                    ))}
                </Styles.Ul>
            </CommonStyles.Article>
        ));

    return (
        <>
            <Header orderView={!!role} />
            {formView ? (
                <Styles.FormContainer>
                    <CommonStyles.Header>Поиск заказов</CommonStyles.Header>
                    <Styles.Form
                        id='search-orders'
                        role='search'
                        action={baseURL}>
                        <CommonStyles.Select
                            onChange={e => nameHandle(e.target.value)}
                            name='waiter'
                            form='search-orders'
                            required>
                            <CommonStyles.Option defaultValue>
                                Официант
                            </CommonStyles.Option>
                            {optionUsers}
                        </CommonStyles.Select>
                        <Styles.Button
                            color='blue'
                            onClick={searchHandle}>
                            Искать
                        </Styles.Button>
                    </Styles.Form>
                </Styles.FormContainer>
            ) : (
                <>
                    <CommonStyles.Header>
                        {header[!!articleOrders.length]}
                    </CommonStyles.Header>
                    <CommonStyles.Container>
                        {waiterOrders && articleOrders}
                    </CommonStyles.Container>
                    {!role ? (
                        <CommonStyles.Footer>
                            <Styles.Button
                                color='blue'
                                onClick={formViewHandle}>
                                Обратно к списку официантов
                            </Styles.Button>
                        </CommonStyles.Footer>
                    ) : null}
                </>
            )}
        </>
    );
};
