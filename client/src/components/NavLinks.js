import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/appContext.js';

import links from '../utils/links.js';
import styled from 'styled-components';

const NavLinks = ({ toggle }) => {
  const { toggleSidebar } = useAppContext();
  return (
    <Wrapper className='nav-links'>
      {links.map((link) => {
        const { id, text, path, icon } = link;
        return (
          <NavLink
            className={({ isActive }) =>
              isActive ? 'active nav-link' : 'nav-link'
            }
            to={path}
            key={id}
            onClick={toggle ? toggleSidebar : null}
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div``;
// const Wrapper = styled.div`
//   .nav-links {
//     padding-top: 2rem;
//     display: flex;
//     flex-direction: column;
//   }
//   .nav-link {
//     display: flex;
//     align-items: center;
//     color: var(--grey-500);
//     padding: 1rem 0;
//     text-transform: capitalize;
//     transition: var(--transition);
//   }
//   .nav-link:hover {
//     color: var(--grey-900);
//   }
//   .nav-link:hover .icon {
//     color: var(--primary-500);
//   }
//   .icon {
//     font-size: 1.5rem;
//     margin-right: 1rem;
//     display: grid;
//     place-items: center;
//     transition: var(--transition);
//   }
//   .active {
//     color: var(--grey-900);
//   }
//   .active .icon {
//     color: var(--primary-500);
//   }
// `;
export default NavLinks;
