import styled from 'styled-components/macro';
import { useAppContext } from '../context/appContext';
import { JobForm } from '.';

const SearchContainer = () => {
  const { resetFilters, isLoading, handleChange, getJobs } = useAppContext();

  const handleSearch = (e) => {
    // if (isLoading) return;
    handleChange(e);
  };

  return (
    <Wrapper>
      <div>
        <JobForm
          title='search form'
          handleChange={handleSearch}
          validateOnChange={false}
          validateOnBlur={false}
          submit={false}
          all={true}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin: 2rem auto;
  border-radius: var(--borderRadius);
  max-width: 100%;
  background: var(--white);
  padding: 2rem 2.5rem 2rem;
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
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
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
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 1rem;
      margin-top: 0.25rem;
    }
  }
  @media (min-width: 992px) {
    margin-top: 0;
  }
  @media (min-width: 1200px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`;
export default SearchContainer;
