import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as Pages from './components/pages/index';

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/api/signup'
                    element={<Pages.SignupPage />}
                />
                <Route
                    path='/api/signin'
                    element={<Pages.SigninPage />}
                />
                <Route
                    path='/'
                    element={<Pages.MainPage />}
                />
                <Route
                    path='/api/orders'
                    element={<Pages.OrdersPage />}
                />
                <Route
                    path='/api/orders/error'
                    element={<Pages.ErrorPage />}
                />
                <Route
                    path='/api/orders/:id'
                    element={<Pages.OrderPage />}
                />
                <Route
                    path='/api/menu'
                    element={<Pages.MenuPage />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
