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
    border-color: transparent;
    border-radius: var(--borderRadius);
    background: var(--white);
    box-shadow: var(--shadow-2);
    padding-bottom: 1rem;
    padding-top: 0.5rem;
  }
  .react-calendar__tile--active {
    background: var(--primary-400);
  }
  .react-calendar__month-view__days__day--weekend {
    color: #222;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    visibility: hidden;
  }
  button.react-calendar__navigation__arrow.react-calendar__navigation__next2-button {
    display: none;
  }
  button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button {
    display: none;
  }
  button.react-calendar__navigation__arrow {
    font-size: 1.75rem;
  }
  button.react-calendar__navigation__arrow.react-calendar__navigation__next-button {
    margin-right: 0.5rem;
  }
  button.react-calendar__navigation__arrow.react-calendar__navigation__prev-button {
    margin-left: 0.5rem;
  }
  span.react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText--from {
    letter-spacing: var(--letterSpacing);
    font-size: 1.125rem;
  }
  abbr[title] {
    border-bottom: none;
    text-decoration: underline;
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
