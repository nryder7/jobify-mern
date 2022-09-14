import { useState } from 'react';
import styled from 'styled-components/macro';
import { Alert, FormRow } from '../../components';
import { useAppContext } from '../../context/appContext';

const Profile = () => {
  const { user, userLocation, updateUser, isLoading, alertVisible, showAlert } =
    useAppContext();
  const [state, setState] = useState({
    name: user?.name,
    lastName: user?.lastName,
    email: user?.email,
    userLocation,
  });
  const handleChange = (e) => {
    setState((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, lastName, email, location } = state;
    if (!name || !email) {
      showAlert('Email and name are required', 'danger');
      return;
    }
    updateUser({
      name,
      lastName,
      email,
      location,
    });
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className='form'>
        <h3>profile</h3>
        {alertVisible && <Alert />}
        <div className='form-center'>
          {Object.entries(state).map((item, index) => {
            return (
              <FormRow
                handleChange={handleChange}
                name={item[0]}
                value={item[1]}
                key={index}
              />
            );
          })}
          <button className='btn btn-block' type='submit' disabled={isLoading}>
            save changes
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  margin: 3rem auto;
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 2rem 2.5rem 2rem;
  /* padding: 3rem 2rem 4rem; */
  /* padding-bottom: 2rem; */
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
    font-size: 1.75rem;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
    max-width: 275px;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 1rem;
    /* margin-top: 0.5rem; */
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 2rem;
      /* column-gap: 1rem; */
    }
    .btn-container {
      /* margin-top: 0; */
    }
  }
  @media (min-width: 992px) {
    margin-top: 0;
  }
  @media (min-width: 1120px) {
    .form-center {
      /* grid-template-columns: 1fr 1fr 1fr; */
    }
    .form-center button {
      /* margin-top: 0; */
    }
  }
`;
export default Profile;
