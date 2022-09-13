import styled from 'styled-components';
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
      <JobForm
        className='form'
        title='search form'
        handleChange={handleSearch}
        validateOnChange={false}
        validateOnBlur={false}
        submit={false}
        all={true}
      />

      {/* className='form-center' */}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  /* height: calc(100vh - var(--nav-height)); */
  margin: 0 auto;
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 2rem 2.5rem 2rem;

  .form {
    width: 100%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.25rem;
  }
  h5 {
    font-weight: 700;
  }
  h3 {
    font-size: 1.75rem;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  @media (min-width: 500px) {
    .form-center {
      row-gap: 0.5rem;
    }
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form {
      margin-top: 0;
    }
  }
  @media (min-width: 1200px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      /* margin-top: 0; */
    }
  }
`;

export default SearchContainer;
