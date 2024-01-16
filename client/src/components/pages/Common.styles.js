import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavBar = styled.header`
    display: flex;
    justify-content: center;
`;
export const Navigation = styled.nav`
    padding: 1em;
    display: flex;
    text-align: center;
    justify-content: center;
`;

export const LogoutBtn = styled.button`
    align-self: center;
    border: 2px solid orange;
    color: white;
    background-color: red;
`;

export const Header = styled.h2`
    font-weight: 400;
    text-align: center;
`;
// сделать выравнивание и ширину как в страницах регистрации через флексы
export const Form = styled.form`
    margin: auto;
    width: 400px;
    height: 300px;
    display: flex;
    padding: 1.5em;
    margin-top: 1.5em;
    flex-direction: column;
    border: 2px solid orange;
    justify-content: space-between;
`;
export const Button = styled.button`
    margin-left: 2.5em;
    padding: 0 1.7em 0 1.7em;
    border-color: ${props => props.color};
`;
export const Select = styled.select`
    padding: 0.5em;
    border: 2px solid orange;
`;
export const Option = styled.option``;
export const Article = styled.article`
    text-align: center;
    border: 2px solid orange;
`;
export const Footer = styled.div`
    padding-top: 2em;
    text-align: right;
`;
export const Container = styled.div`
    gap: 1em;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`;

export const SLink = styled(Link)`
    color: black;
    margin: 0.5em;
    text-decoration: none;
    outline: 2px solid orange;
    padding: 0.5em 1.5em 0.5em 1.5em;
`;
export const Info = styled.p`
    padding-top: 0.8em;
    border-top: 2px solid orange;
`;
