import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import '../Login/styles.scss';
import '../styles.scss';

function Register() {

  const [ slide, setSlide ] = useState(0);

  return (
    <>
      <Menu/>
      <div className="account-container">
        <h1 className="account-container__title">
          new account
        </h1>
        {
          slide == 0 ?
          <>
            <div className="account-container__inputbox">
              <span className="account-container__inputbox--label">Name</span>
              <input className="account-container__inputbox--input"></input>
            </div>
            <div className="account-container__inputbox">
              <span className="account-container__inputbox--label">Birthdate</span>
              <input className="account-container__inputbox--input"></input>
            </div>
            <span className="account-container__noaccount">Already have an account?
              <Link to="/login">Login</Link>.
            </span>
            <div className="account-container__button-container">
              <button onClick={() => {setSlide(1)}} className="account-container__button-container--button">&gt;&gt;</button>
            </div> </> : <>
            <div className="account-container__inputbox">
              <span className="account-container__inputbox--label">E-mail</span>
              <input className="account-container__inputbox--input"></input>
            </div>
            <div className="account-container__inputbox">
              <span className="account-container__inputbox--label">Password</span>
              <input className="account-container__inputbox--input"></input>
            </div>
            <div className="account-container__inputbox">
              <span className="account-container__inputbox--label">Confirm Password</span>
              <input className="account-container__inputbox--input"></input>
            </div>
            <div className="account-container__button-container pair">
              <button onClick={() => {setSlide(0);}} className="account-container__button-container--button">&lt;&lt;</button>
              <button className="account-container__button-container--button">Register</button>
            </div>
            </> 
        }
      </div>
    </>
  );
}

export default Register;
