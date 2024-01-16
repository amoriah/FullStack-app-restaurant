import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Styles from './OrderPage.styles';
import * as CommonStyles from '../Common.styles';
import mock from '../../../mocks/menu_mock';
import { baseURL } from '../../../constants';
import { Header } from '../../Header';

export const OrderPage = () => {
    const navigate = useNavigate();
    const [waiter, setWaiter] = useState([]);
    const [order, setOrder] = useState({
        id: 0,
        isActive: false,
        items: [],
        UserId: 0,
        createdAt: '',
        updatedAt: '',
    });

    const location = useLocation();
    const orderId = location.pathname.replace('/api/orders/', '');
    let waiterId = 0;

    const amount = order.items.reduce((amount, dishId) => {
        return amount + mock.menu[dishId - 1].cost;
    }, 0);

    useEffect(() => {
        fetch(baseURL)
            .then(async res => {
                const responce = await res.json();
                const orders = responce.orders;
                const currentOrder = orders.find(
                    order => order.id === Number(orderId),
                );
                if (currentOrder) {
                    setOrder(state => {
                        state.id = currentOrder.id;
                        state.isActive = currentOrder.isActive;
                        state.items = currentOrder.items;
                        state.UserId = currentOrder.UserId;
                        state.createdAt = currentOrder.createdAt;
                        state.updatedAt = currentOrder.updatedAt;
                        return state;
                    });
                }
                return responce;
            })
            .then(res => {
                // eslint-disable-next-line
                waiterId = order.UserId;
                const currentWaiter = res.users.find(u => u.id === waiterId);
                setWaiter(currentWaiter);
            });
    }, [waiterId]);

    if (!order) {
        return <CommonStyles.Header>Заказ не найден</CommonStyles.Header>;
    }

    const articleOrder = order.items.map(dishId => (
        <CommonStyles.Article key={dishId - 1}>
            <img
                src={mock.menu[dishId - 1].image}
                alt={mock.menu[dishId - 1].name}
                width='300px'
                height='200px'
            />
            <CommonStyles.Info>{mock.menu[dishId - 1].name}</CommonStyles.Info>
            <CommonStyles.Info>
                {mock.menu[dishId - 1].cost + ' рублей'}
            </CommonStyles.Info>
        </CommonStyles.Article>
    ));

    const handleCancel = () => {
        fetch(location.pathname, {
            method: 'delete',
            body: orderId,
        }).then(() => {
            navigate(-1);
        });
    };

    const errorNavigate = () => {
        navigate(`/api/orders/error`);
    };

    return (
        <>
            <Header />
            <CommonStyles.Header>
                {waiter
                    ? 'Заказ №' + order.id + '. Официант ' + waiter.name
                    : errorNavigate()}
            </CommonStyles.Header>
            <CommonStyles.Container>
                {order && articleOrder}
            </CommonStyles.Container>
            <CommonStyles.Footer>
                <Styles.Amount>Итого: {amount + ' рублей'}</Styles.Amount>
                <CommonStyles.Button
                    color='red'
                    onClick={handleCancel}>
                    Отменить заказ
                </CommonStyles.Button>
            </CommonStyles.Footer>
        </>
    );
};
