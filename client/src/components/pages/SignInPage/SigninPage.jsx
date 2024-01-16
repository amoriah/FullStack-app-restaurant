import { useNavigate } from 'react-router-dom';
import * as Styles from '../OrdersPage/OrdersPage.styles';
import * as CommonStyles from '../Common.styles';
import * as AuthStyle from '../Auth.styles';
import { baseURL } from '../../../constants';

export const SigninPage = () => {
    const navigate = useNavigate();

    const handleSubmit = async event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const login = formData.get('login');
        const password = formData.get('password');

        fetch(baseURL + '/api/loginUser', {
            method: 'post',
            body: JSON.stringify({ login, password }),
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
                    navigate('/');
                } else {
                    alert(res.message);
                    navigate(0);
                }
            });
    };
    return (
        <>
            <AuthStyle.Container>
                <AuthStyle.Form
                    id='signin'
                    onSubmit={handleSubmit}>
                    <AuthStyle.Label htmlFor='login'>
                        login
                        <AuthStyle.Input
                            id='login'
                            name='login'
                            type='text'
                        />
                    </AuthStyle.Label>
                    <AuthStyle.Label htmlFor='password'>
                        password
                        <AuthStyle.Input
                            name='password'
                            id='password'
                            type='text'
                        />
                    </AuthStyle.Label>
                    <AuthStyle.AccountDiv>
                        <p>
                            New to our game?{' '}
                            <a href='/api/signup'>Create an account</a>.
                        </p>
                    </AuthStyle.AccountDiv>
                    <Styles.ButtonContainer>
                        <CommonStyles.Button>Sign in</CommonStyles.Button>
                    </Styles.ButtonContainer>
                </AuthStyle.Form>
            </AuthStyle.Container>
        </>
    );
};
