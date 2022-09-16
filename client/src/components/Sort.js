import { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useAppContext } from '../context/appContext';

const Sort = ({ items, children }) => {
  const { setSort, sort, date } = useAppContext();
  const handleSort = (e) => {
    setSort(e);
  };

  const options = (
    <>
      {!date && (
        <>
          <option value='created.new'>created (recent)</option>
          <option value='created.old'>created (oldest)</option>
        </>
      )}
      <option value='company.a'>company (A - Z)</option>
      <option value='company.z'>company (Z - A)</option>
      <option value='position.a'>position (A - Z)</option>
      <option value='position.z'>position (Z - A)</option>
    </>
  );
  return (
    <Wrapper>
      {children}
      <hr />
      {items > 0 && (
        <form>
          <label htmlFor='sort'>sort by</label>
          <select
            name='sort'
            id='sort'
            className='sort-input'
            value={sort}
            onChange={(e) => handleSort(e)}
          >
            {options}
          </select>
        </form>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  @media (min-width: 425px) {
    display: grid;
    align-items: center;
    margin-bottom: 2rem;
    column-gap: 2rem;
    grid-template-columns: auto 1fr auto;
  }
  @media (max-width: 425px) {
    hr {
      display: none;
    }
    form {
      margin-top: 0.625rem;
      margin-bottom: 0.625rem;
    }
  }
  p {
    text-transform: capitalize;
    margin-bottom: 0;
  }
  label {
    display: inline-block;
    margin-right: 0.125rem;
  }
  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background-color: var(---50);
    /* background-color: transparent; */
  }
  label {
    font-size: 1rem;
    text-transform: capitalize;
  }
`;

export default Sort;
