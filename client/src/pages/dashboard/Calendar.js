import { useEffect } from 'react';
import { Calendar, JobsContainer, Loading } from '../../components';
import { useAppContext } from '../../context/appContext';
const Stats = () => {
  const {
    isSearch,
    setIsSearch,
    clearForm,
    showStats,
    isLoading,
    monthlyApplications,
    company,
    getJobs,
    position,
    officeLocation,
    jobSetting,
    jobType,
    jobStatus,
    page,
    sort,
    date,
    setFilter,
    interviewDate,
  } = useAppContext();

  useEffect(() => {
    clearForm();
  }, []);

  useEffect(() => {
    // showStats();
    setIsSearch(true);
    setFilter({ name: 'jobStatus', value: 'interview' });
    getJobs();
  }, [
    company,
    position,
    officeLocation,
    jobSetting,
    jobType,
    jobStatus,
    page,
    sort,
    date,
    interviewDate,
  ]);

  // useEffect(() => {
  //   // getJobs();
  //   clearForm();
  //   showStats();
  //   setIsSearch(true);
  // }, [isSearch]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Calendar />
      <JobsContainer title='Interview' />
    </>
  );
};

export default Stats;
