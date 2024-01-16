import { Header } from '../../Header';
import * as CommonStyles from '../Common.styles';

export const ErrorPage = () => {
    return (
        <>
            <Header />
            <CommonStyles.Header>
                <p>Ошибка.</p>
                <p>Проблемы с запросом.</p>{' '}
                <p>
                    Возможно реакт не успел обновить состояние данных или же
                    данные пришли в неожиданном формате((
                </p>
                <p>Попробуй снова и когда-нибудь заработает.</p>
            </CommonStyles.Header>
        </>
    );
};
