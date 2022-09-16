import { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useAppContext } from '../context/appContext';
import Stats from '../pages/dashboard/Calendar';
import Job from './Job';
import Loading from './Loading';
import PageBtnContainer from './PageBtnContainer';
import Sort from './Sort';

const JobsContainer = ({ title = 'Job', interview = false }) => {
  const {
    getJobs,
    jobs,
    isLoading,
    numOfPages,
    page,
    totalJobs,
    company,
    position,
    officeLocation,
    jobSetting,
    jobType,
    jobStatus,
    sort,
    date,
    stats,
  } = useAppContext();

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     getJobs();
  //     return () => {
  //       clearTimeout(timeout);
  //     };
  //   }, 15000);
  // }, [
  //   company,
  //   position,
  //   officeLocation,
  //   jobSetting,
  //   jobType,
  //   jobStatus,
  //   page,
  //   sort,
  //   date,
  // ]);

  if (isLoading) {
    return <Loading center />;
  }
  if (jobs.length < 1) {
    <>no jobs found</>;
  }
  return (
    <Wrapper>
      <Sort items={totalJobs}>
        <h5 className='total'>
          {totalJobs} {title}
          {(totalJobs > 1 || totalJobs === 0) && 's'} found
        </h5>
      </Sort>
      <div className='underline'></div>

      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 0 && <PageBtnContainer />}
      {/* {numOfPages > 0 && title !== <PageBtnContainer />} */}
    </Wrapper>
  );
};
const Wrapper = styled.section`
  /* margin-top: 4rem; */
  .underline {
    background: var(--primary-300);
    width: 100%;
    height: 0.25rem;
    margin: 2rem auto;
    margin-top: -1.5rem;
  }
  @media (max-width: 425px) {
    .underline {
      margin-top: 0.5rem;
    }
  }
  h2 {
    text-transform: none;
  }
  .total {
    margin-bottom: 0;
  }
  & > h5 {
    font-weight: 700;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }

  @media (min-width: 800px) {
    .jobs {
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
  @media (min-width: 992px) {
    .jobs {
      grid-template-columns: 1fr;
    }
  }
  @media (min-width: 1120px) {
    .jobs {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
`;

export default JobsContainer;
