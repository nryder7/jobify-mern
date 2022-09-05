import styled, { createGlobalStyle } from 'styled-components';
import { useAppContext } from '../context/appContext';
import { FormRow } from '.';
import searchFormOptions from '../utils/searchForm';
import { useEffect } from 'react';

const SearchContainer = () => {
  const {
    resetFilters,
    clearForm,
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    handleChange,
    clearFilters,
    statusOptions,
    jobTypeOptions,
    getJobs,
    company,
    position,
    officeLocation,
    jobSetting,
    jobType,
    jobStatus,
  } = useAppContext();

  const job = {
    position,
    company,
    officeLocation,
    jobStatus,
    jobSetting,
    jobType,
  };

  const handleSearch = (e) => {
    // if (isLoading) return;
    handleChange(e);
  };
  const handleClear = (e) => {
    e.preventDefault();
    clearForm();
  };

  return (
    <Wrapper>
      <form
        className='form'
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h4>search form</h4>
        <div className='form-center'>
          {searchFormOptions.map((item) => {
            return (
              <FormRow
                key={item.id}
                {...item}
                handleChange={handleSearch}
                value={job[item.name] || ''}
              />
            );
          })}
          <button
            className='btn btn-block btn-danger'
            // disabled={isLoading}
            onClick={handleClear}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
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
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`;

export default SearchContainer;
