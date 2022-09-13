import styled from 'styled-components';
import moment from 'moment';
import { FaBriefcase, FaCalendarAlt, FaLocationArrow } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import JobInfo from './JobInfo';

const Job = ({
  company,
  position,
  createdAt,
  _id: id,
  officeLocation,
  type,
  status,
}) => {
  const { setIsEditJob, deleteJob } = useAppContext();

  let date = moment(createdAt);
  date = date.format('MMM Do, YYYY');
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
        <div className={`status ${status}`}>{status}</div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={officeLocation} />
          <JobInfo icon={<FaBriefcase />} text={type} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
        </div>
      </div>
      <footer>
        <div className='actions'>
          <Link
            to='/add-job'
            className='btn edit-btn'
            onClick={() => setIsEditJob(id)}
          >
            edit
          </Link>
          <button
            className='btn delete-btn'
            type='button'
            onClick={() => {
              deleteJob(id);
            }}
          >
            delete
          </button>
        </div>
      </footer>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    h5 {
      letter-spacing: 0;
    }
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
    h5 {
      margin-bottom: 0.25rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--grey-400);
      letter-spacing: var(--letterSpacing);
    }
  }
  .pending {
    background: #fcefc7;
    color: #e9b949;
  }
  .interview {
    background: #e0e8f9;
    color: #647acb;
  }
  .declined {
    color: #d66a6a;
    background: #ffeeee;
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
    align-self: start;
    margin-top: 0.75rem;
    margin-left: 0.5rem;
  }
  footer {
    margin-top: 1rem;
    padding-left: 1.5rem;
    padding-bottom: 1.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
    justify-content: space-around;
  }
  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
  }
  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.5rem;
  }
  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
  }
  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  &:hover .actions {
    visibility: visible;
  }
`;

export default Job;
