import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { differenceInCalendarDays } from 'date-fns';
import styled from 'styled-components/macro';
import { useAppContext } from '../context/appContext';
import JobsContainer from './JobsContainer';
// const disabledDates = [tomorrow, in3Days, in5Days];

const CalendarComponent = () => {
  const [value, setValue] = useState(new Date());
  //   const disabledDates = [date.setDate(date.getDate() + 1)];
  const { date, setDate } = useAppContext();

  function isSameDay(a, b) {
    return differenceInCalendarDays(a, b) === 0;
  }

  function tileDisabled({ date, view }) {
    // Disable tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is on the list of disabled dates
      //   return disabledDates.find((dDate) => isSameDay(dDate, date));
    }
  }

  const onChange = (nextValue) => {
    setDate(nextValue);
    setValue(nextValue);
  };

  return (
    <Wrapper>
      <Calendar
        calendarType='US'
        onChange={onChange}
        value={value}
        tileDisabled={tileDisabled}
        //   view='century'
      />
    </Wrapper>
  );
};
const Wrapper = styled.section`
  margin-top: 4rem;
  margin-bottom: 2rem;
  .react-calendar {
    width: 100%;
  }
  .date {
    width: 100%;
    background: white;
  }
  @media (min-width: 992px) {
    margin-top: 0;
  }
`;

export default CalendarComponent;
