import React, { useEffect, useState } from 'react';
import '../index.css';
import Navbar from './Navbar.js';

export default function Signin() {
    const [activeForm, setActiveForm] = useState('login');

    useEffect(() => {
        const switchers = document.querySelectorAll('.switcher');

        const handleClick = (event) => {
            const clickedSwitcher = event.target;
            switchers.forEach((item) => item.parentElement.classList.remove('is-active'));
            clickedSwitcher.parentElement.classList.add('is-active');
            setActiveForm(clickedSwitcher.classList.contains('switcher-login') ? 'login' : 'signup');
        };

        switchers.forEach((item) => {
            item.addEventListener('click', handleClick);

            return () => {
                item.removeEventListener('click', handleClick);
            };
        });
    }, []);

    const handleFormSubmit = (event) => {
        event.preventDefault();

    
        if (activeForm === 'login') {
        
            const email = event.target.querySelector('#login-email').value;
            const password = event.target.querySelector('#login-password').value;
            console.log('Login form submitted:', { email, password });
        } else if (activeForm === 'signup') {
          
            const email = event.target.querySelector('#signup-email').value;
            const password = event.target.querySelector('#signup-password').value;
            const confirmPassword = event.target.querySelector('#signup-password-confirm').value;
            console.log('Signup form submitted:', { email, password, confirmPassword });
        }
    };


  const backgroundStyles = {
    background: 'linear-gradient(to right, #a3b18a 40%, #a3b18a 60%, #344e41 60%, #344e41 100%)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    padding: '10px',
    position: 'relative',
  };

  const imageStyles = {
    position: 'absolute',
    top: '45%',
    left: '45%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '70%',
   
  };

  const h1Styles = {
    position: 'absolute',
    top: '50%',
    left: '80%',
    transform: 'translate(-50%, -50%)',
    fontWeight: 'bold',
    fontSize: '5em',
    transition: 'color 0.5s ease-in-out',
  };
  
  return (
    <div style={backgroundStyles}>
      <Navbar />
      <div style={imageStyles}>
            
            <section style={{ padding: '100px', textAlign: 'center' }}>
                <div className="forms">
                    <div className={`form-wrapper ${activeForm === 'login' ? 'is-active' : ''}`}>
                        <button type="button" className="switcher switcher-login">
                            Login
                            <span className="underline"></span>
                        </button>
                        <form className="form form-login" onSubmit={handleFormSubmit}>
                            <fieldset>
                                <legend>Please, enter your email and password for login.</legend>
                                <div className="input-block">
                                    <label htmlFor="login-email">E-mail</label>
                                    <input id="login-email" type="email" required />
                                </div>
                                <div className="input-block">
                                    <label htmlFor="login-password">Password</label>
                                    <input id="login-password" type="password" required />
                                </div>
                            </fieldset>
                            <button type="submit" className="btn-login">
                                Login
                            </button>
                        </form>
                    </div>
                    <div className={`form-wrapper ${activeForm === 'signup' ? 'is-active' : ''}`}>
                        <button type="button" className="switcher switcher-signup">
                            Sign Up
                            <span className="underline"></span>
                        </button>
                        <form className="form form-signup" onSubmit={handleFormSubmit}>
                            <fieldset>
                                <legend>Please, enter your email, password, and password confirmation for sign up.</legend>
                                <div className="input-block">
                                    <label htmlFor="signup-email">E-mail</label>
                                    <input id="signup-email" type="email" required />
                                </div>
                                <div className="input-block">
                                    <label htmlFor="signup-password">Password</label>
                                    <input id="signup-password" type="password" required />
                                </div>
                                <div className="input-block">
                                    <label htmlFor="signup-password-confirm">Confirm password</label>
                                    <input id="signup-password-confirm" type="password" required />
                                </div>
                            </fieldset>
                            <button type="submit" className="btn-signup">
                                Continue
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
      <h1 style={h1Styles}>
        Tool to De-Blur Image Using GAN.
      </h1>
    </div>
  );
}
