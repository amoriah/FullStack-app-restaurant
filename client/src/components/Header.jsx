import { useNavigate } from 'react-router-dom';
import * as Styles from './pages/Common.styles';
import { baseURL } from '../constants';

export const Header = ({ orderView = true, outer }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        fetch(baseURL + '/api/logout', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then(async res => {
                return await res.json();
            })
            .then(res => {
                if (res.success) {
                    navigate('/api/signin');
                } else {
                    alert(res.message);
                    navigate(0);
                }
            });
    };

    return (
        <>
            {' '}
            {!outer && (
                <Styles.NavBar>
                    <Styles.Navigation>
                        <Styles.SLink to='/'>Main</Styles.SLink>
                        <Styles.SLink to='/api/menu'>Menu</Styles.SLink>
                        {orderView && (
                            <Styles.SLink to='/api/orders'>Orders</Styles.SLink>
                        )}
                    </Styles.Navigation>
                    <Styles.LogoutBtn onClick={handleLogout}>
                        (￣▽￣)ノ{' '}
                    </Styles.LogoutBtn>
                </Styles.NavBar>
            )}
        </>
    );
};
