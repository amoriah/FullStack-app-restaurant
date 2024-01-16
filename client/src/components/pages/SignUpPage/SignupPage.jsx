import { useNavigate } from 'react-router-dom';
import * as Styles from '../OrdersPage/OrdersPage.styles';
import * as CommonStyles from '../Common.styles';
import * as AuthStyle from '../Auth.styles';
import { baseURL } from '../../../constants';

export const SignupPage = () => {
    const navigate = useNavigate();

    const handleSubmit = async event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get('name');
        const role = formData.get('role');
        const login = formData.get('login');
        const password = formData.get('password');
        const repeat = formData.get('repeat');

        if (password !== repeat) {
            alert('Неверный пароль');
            navigate(0);
            return;
        }

        fetch(baseURL + '/api/addUser', {
            method: 'post',
            body: JSON.stringify({ name, role, login, password }),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        })
            .then(async res => {
                return await res.json();
            })
            .then(res => {
                if (res.success) navigate('/api/signin');
            });
    };

    return (
        <>
            <AuthStyle.Container>
                <AuthStyle.Form
                    id='signup'
                    onSubmit={handleSubmit}>
                    <AuthStyle.Label htmlFor='name'>
                        name
                        <AuthStyle.Input
                            name='name'
                            id='name'
                            type='text'
                        />
                    </AuthStyle.Label>
                    <AuthStyle.Label>
                        role
                        <AuthStyle.Select
                            name='role'
                            required>
                            <CommonStyles.Option
                                value='waiter'
                                defaultValue>
                                waiter
                            </CommonStyles.Option>
                            <CommonStyles.Option value='admin'>
                                admin
                            </CommonStyles.Option>
                        </AuthStyle.Select>
                    </AuthStyle.Label>
                    <AuthStyle.Label htmlFor='login'>
                        login
                        <AuthStyle.Input
                            name='login'
                            id='login'
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
                    <AuthStyle.Label htmlFor='repeat'>
                        repeat password
                        <AuthStyle.Input
                            name='repeat'
                            id='repeat'
                            type='text'
                        />
                    </AuthStyle.Label>
                    <AuthStyle.AccountDiv>
                        <p>
                            Already have an account?{' '}
                            <a href='/api/signin'>Sign in</a>.
                        </p>
                    </AuthStyle.AccountDiv>
                    <Styles.ButtonContainer>
                        <CommonStyles.Button type='submit'>
                            Sign up
                        </CommonStyles.Button>
                    </Styles.ButtonContainer>
                </AuthStyle.Form>
            </AuthStyle.Container>
        </>
    );
};
