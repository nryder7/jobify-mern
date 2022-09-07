import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { useAppContext } from '../context/appContext.js';
import { NavLinks, Logo } from './index.js';

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className='content'>
          <button className='close-btn' type='button' onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggle={true} />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  @media (min-width: 992px) {
    display: none;
  }
  /* @media (orientation: portrait) {
    .content {
      display: grid;
      grid-template-columns: 2;
    }
  } */
  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    transition: var(--transition);
  }
  .show-sidebar {
    z-index: 99;
    opacity: 1;
  }
  .content {
    background: var(--white);
    width: var(--fluid-width);
    height: 95vh;
    border-radius: var(--borderRadius);
    padding: 4rem 2rem;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: transparent;
    border-color: transparent;
    font-size: 2rem;
    color: var(--red-dark);
    cursor: pointer;
  }
  @media (max-height: 400px) {
    .nav-links {
      margin-top: 1.5rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 2.5rem;
      row-gap: 1rem;
    }
    .nav-link {
      border-bottom: 1px solid var(--grey-100);
      border-bottom: 1px solid var(--primary-300);
      padding: 0.75rem 0;
    }
  }

  @media (min-height: 400px) {
    .nav-links {
      padding-top: 2rem;
      display: flex;
      flex-direction: column;
    }
    .nav-link {
      display: flex;
    }
  }
  .nav-link {
    display: flex;
    align-items: center;
    color: var(--grey-500);
    /* padding: 1rem 0; */
    text-transform: capitalize;
    transition: var(--transition);
  }
  .nav-link:hover {
    color: var(--grey-900);
  }
  .nav-link:hover .icon {
    color: var(--primary-500);
  }
  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
    transition: var(--transition);
  }
  .active {
    color: var(--grey-900);
  }
  .active .icon {
    color: var(--primary-500);
  }
`;

export default SmallSidebar;
