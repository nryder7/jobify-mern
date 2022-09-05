import { useEffect } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../context/appContext';
import Job from './Job';
import Loading from './Loading';
import PageBtnContainer from './PageBtnContainer';

const JobsContainer = () => {
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
  } = useAppContext();

  useEffect(() => {
    getJobs();
  }, [company, position, officeLocation, jobSetting, jobType, jobStatus, page]);

  if (isLoading) {
    return <Loading center />;
  }
  if (jobs.length < 1) {
    <>no jobs found</>;
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{totalJobs > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 0 && <PageBtnContainer />}
    </Wrapper>
  );
};
const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 992px) {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`;

export default JobsContainer;
