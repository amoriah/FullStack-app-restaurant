import styled from 'styled-components';

export const FormContainer = styled.div`
    margin: auto;
    width: 400px;
    height: 200px;
    display: flex;
    margin-top: 1.5em;
    flex-direction: column;
    justify-content: center;
    border: 2px solid orange;
`;
// сделать выравнивание и ширину как в страницах регистрации через флексы
export const Form = styled.form`
    margin: auto;
    padding: 1em;
    height: 150px;
    width: 350px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
`;
export const Button = styled.button`
    padding: 0 1.7em 0 1.7em;
    border-color: ${props => props.color};
`;
export const Ul = styled.ul`
    font-size: 1.2em;
    text-align: left;
    padding-left: 4em;
`;
export const Li = styled.li`
    padding-left: 1em;
    list-style-type: '♨';
    list-style-position: outside;
`;
