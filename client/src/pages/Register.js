import { useState, useEffect } from 'react';
import { Alert, FormRow, Logo } from '../components';
import styled from 'styled-components/macro';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

const initialState = {
  email: '',
  name: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const { user, isLoading, alertVisible, showAlert, loginUser, registerUser } =
    useAppContext();

  const handleChange = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, name, password, isMember } = state;
    if ((!isMember && !name) || !email || !password) {
      showAlert('Please provide all values', 'danger');
      return;
    }
    if (isMember) {
      loginUser({ email, password });
    } else {
      registerUser({ email, name, password });
    }
  };

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
      <form onSubmit={(e) => handleSubmit(e)} className='form'>
        <Logo />
        <h3>{state.isMember ? 'login' : 'register'}</h3>
        {alertVisible && <Alert />}
        {!state.isMember && (
          <FormRow
            type='text'
            name='name'
            value={state.name}
            handleChange={handleChange}
          />
        )}
        <FormRow
          type='email'
          name='email'
          value={state.email}
          handleChange={handleChange}
        />
        <FormRow
          type='password'
          name='password'
          value={state.password}
          handleChange={handleChange}
        />
        <button className='btn btn-block' type='submit' disabled={isLoading}>
          submit
        </button>
        <button
          onClick={() => {}}
          className='btn btn-block'
          type='button'
          disabled={isLoading}
        >
          demo
        </button>

        <p>
          {state.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type='button' onClick={toggleIsMember} className='member-btn'>
            {state.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
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
