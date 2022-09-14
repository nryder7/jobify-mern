import styled from 'styled-components/macro';
import React, { useState } from 'react';
import BarChart from './BarChart';
import AreaChart from './AreaChart';
import { useAppContext } from '../context/appContext';

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications: data } = useAppContext();
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button
        className='btn '
        onClick={() => {
          setBarChart(!barChart);
        }}
      >
        {barChart ? 'see area chart' : 'see bar chart'}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};
const Wrapper = styled.section`
  margin-top: 0;
  /* margin-top: 4rem; */
  text-align: center;
  button {
    background: transparent;
    /* border-color: transparent; */
    text-transform: capitalize;
    color: var(--primary-600);
    font-size: 1.25rem;
    cursor: pointer;
  }
  button:hover {
    color: var(--primary-100);
  }
  h4 {
    text-align: center;
    margin-bottom: 0.75rem;
  }
`;

export default ChartsContainer;
