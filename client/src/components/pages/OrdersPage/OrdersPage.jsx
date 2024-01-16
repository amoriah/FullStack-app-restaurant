import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Styles from './OrdersPage.styles';
import * as CommonStyles from '../Common.styles';
import { Header } from '../../Header';
import { baseURL } from '../../../constants';
import menu from '../../../mocks/menu_mock';

export const OrdersPage = () => {
    const [waiters, setWaiters] = useState([]);
    const [waiter, setWaiter] = useState('');
    const [session, setSession] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch(baseURL).then(async res => {
            const responce = await res.json();
            if (responce.redirectUrl) {
                navigate(responce.redirectUrl);
            } else if (!responce.success) {
                navigate('/api/orders/error');
            } else {
                setWaiters(responce.users);
                setSession(responce.session.role);
            }
        });
    }, [navigate]);

    const handleWaiter = event => {
        setWaiter(event.target.value.replace('Официант', ''));
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const dishes = formData.getAll('dishes').filter(e => e !== '');

        if (!waiter) {
            alert('Нужно выбрать официанта');
            return;
        }

        fetch(baseURL + '/api/orders', {
            method: event.target.method,
            body: JSON.stringify({ waiter, dishes }),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }).then(
            async res => {
                const id = await res.json();
                navigate(`/api/orders/${id}`);
            },
            () => {
                navigate(`/api/orders/error`);
            },
        );
    };

    const optionWaiters = waiters
        .filter(u => u.role !== 'admin')
        .map(w => {
            if (!w) navigate(`/api/orders/error`);
            return (
                <CommonStyles.Option
                    value={w.name}
                    key={w.id}>
                    {w.name}
                </CommonStyles.Option>
            );
        });

    const optionDish = menu.menuNames.map(dish => (
        <CommonStyles.Option
            value={dish}
            key={dish}>
            {dish}
        </CommonStyles.Option>
    ));
    return (
        <>
            <Header orderView={session === 'waiter'} />{' '}
            {session === 'waiter' && (
                <CommonStyles.Form
                    id='make-orders'
                    method='post'
                    onSubmit={handleSubmit}>
                    <Styles.SelectContainer>
                        <CommonStyles.Select
                            name='waiter'
                            form='make-orders'
                            required
                            onChange={handleWaiter}>
                            <CommonStyles.Option defaultValue>
                                Официант
                            </CommonStyles.Option>
                            {optionWaiters}
                        </CommonStyles.Select>
                        <CommonStyles.Select
                            name='dishes'
                            form='make-orders'
                            required
                            multiple>
                            {optionDish}
                        </CommonStyles.Select>
                    </Styles.SelectContainer>
                    <Styles.ButtonContainer>
                        <CommonStyles.Button
                            color='red'
                            type='reset'
                            onClick={() => setWaiter('')}>
                            Отмена
                        </CommonStyles.Button>
                        <CommonStyles.Button
                            color='green'
                            type='submit'>
                            Готово
                        </CommonStyles.Button>
                    </Styles.ButtonContainer>
                </CommonStyles.Form>
            )}
        </>
    );
};
