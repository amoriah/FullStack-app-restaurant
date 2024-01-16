import { useEffect, useState } from 'react';
import * as Styles from './MenuPage.styles';
import * as CommonStyles from '../Common.styles';
import { Header } from '../../Header';
import { baseURL } from '../../../constants';
import mock from '../../../mocks/menu_mock';

export const MenuPage = () => {
    const [role, setRole] = useState('');
    const [outer, setOuter] = useState(true);

    useEffect(() => {
        fetch(baseURL).then(async res => {
            const responce = await res.json();
            if (responce.success) {
                setOuter(false);
                setRole(responce.session.role);
            }
        });
    }, []);

    const articleMenu = mock.menu.map(dish => {
        return (
            <CommonStyles.Article key={dish.name}>
                <img
                    src={dish.image}
                    alt={dish.name}
                    width='220px'
                    height='150px'
                />
                <CommonStyles.Info>{dish.name}</CommonStyles.Info>
                <Styles.Description>{dish.description}</Styles.Description>
                <CommonStyles.Info>{dish.cost + ' рублей'}</CommonStyles.Info>
                <CommonStyles.Info>
                    {dish.callories + ' энергии'}
                </CommonStyles.Info>
            </CommonStyles.Article>
        );
    });

    return (
        <>
            <Header
                orderView={role === 'waiter'}
                outer={outer}
            />
            <CommonStyles.Header>
                Огромное меню нашего ресторана
            </CommonStyles.Header>
            <CommonStyles.Container>{articleMenu}</CommonStyles.Container>
        </>
    );
};
