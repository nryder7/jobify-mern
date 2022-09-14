import styled from 'styled-components/macro';
import { Outlet, Link } from 'react-router-dom';
import { SmallSidebar, BigSidebar, Navbar } from '../../components/index.js';

const SharedLayout = () => {
  return (
    <Wrapper>
      <main className='dashboard'>
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className='dashboard-page'>
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 0;
    margin-top: -1.5rem;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
      padding: 0;
      padding: 2rem 0;
      margin-top: 0.25rem;
    }
  }
`;
export default SharedLayout;
