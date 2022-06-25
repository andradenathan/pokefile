import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import './styles.scss';
import '../styles.scss';

function Login() {
  return (
    <>
      <Menu/>
      <div className="account-container">
        <h1 className="account-container__title">
          Hello ^-^
        </h1>
        <div className="account-container__inputbox">
          <span className="account-container__inputbox--label">E-mail</span>
          <input className="account-container__inputbox--input"></input>
        </div>
        <div className="account-container__inputbox">
          <span className="account-container__inputbox--label">Password</span>
          <input className="account-container__inputbox--input"></input>
        </div>
        <span className="account-container__noaccount">No account?
          <Link to="/register">Register</Link>.
        </span>
        <div className="account-container__button-container">
          <button className="account-container__button-container--button">Login</button>
        </div>
      </div>
    </>
  );
}

export default Login;
