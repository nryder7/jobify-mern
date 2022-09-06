import styled from 'styled-components';
import StatItem from './StatItem';
import { useAppContext } from '../context/appContext';

import defaultStats from '../utils/stats';

const StatsContainer = () => {
  const { stats } = useAppContext();
  if (stats) {
    return (
      <Wrapper>
        {defaultStats.map((stat) => {
          return (
            <StatItem key={stat.id} count={stats[stat.status] || 0} {...stat} />
          );
        })}
      </Wrapper>
    );
  }
};

const Wrapper = styled.section`
  margin: 3rem auto;
  display: grid;
  row-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 992px) {
    margin-top: 0;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1rem;
  }
`;
export default StatsContainer;
