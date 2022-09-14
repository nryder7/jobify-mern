import { useState, useEffect } from 'react';
import { Alert, FormRow, Logo } from '../components';
import FormikRegister from '../components/FormikRegister';
import FormikLogin from '../components/FormikLogin';
import styled from 'styled-components/macro';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({ isMember: true });
  const { user, isLoading, alertVisible, showAlert, loginUser, registerUser } =
    useAppContext();

  const toggleIsMember = () => {
    setState((prev) => {
      return { ...prev, isMember: !prev.isMember };
    });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 2500);
    }
  }, [user, navigate]);

  return (
    <Wrapper className='full-page'>
      <div className='form'>
        <Logo />
        <h3>{state.isMember ? 'login' : 'register'}</h3>
        {alertVisible && <Alert />}

        {state.isMember ? (
          <FormikLogin loginUser={loginUser} />
        ) : (
          <FormikRegister registerUser={registerUser} />
        )}

        <p>
          {state.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type='button' onClick={toggleIsMember} className='member-btn'>
            {state.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;

export default Register;
