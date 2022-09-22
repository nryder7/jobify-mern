import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useField, useFormikContext } from 'formik';

import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

// CSS Modules, react-datepicker-cssmodules.css
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

// export const DatePickerComp = () => {
//   const [startDate, setStartDate] = useState(new Date());
//   return (
//     <Wrapper className='form-input'>
//       <DatePicker
//         selected={startDate}
//         onChange={setStartDate}
//         showTimeSelect
//         dateFormat='Pp'
//       />
//     </Wrapper>
//   );
// };
// const Wrapper = styled.div`
//   width: 100%;
//   display: flex;
//   input[type='text'] {
//     width: 100%;
//     /* padding: 6px 4px; */
//     /* padding-bottom: -5px; */
//     outline-offset: 12px;
//     border: none;
//     background: transparent;
//     letter-spacing: var(--letterSpacing);
//     justify-self: start;
//   }
//   /* .react-datepicker-popper {
//     inset: -3px auto auto -25px;
//   } */
//   @media (max-width: 360px) {
//     .react-datepicker {
//       inset: -1px auto auto -55px;
//     }
//   }
//   .react-datepicker {
//     position: absolute;
//     /* inset: -1px auto auto -30px; */
//   }
//   .react-datepicker-popper {
//     transform: none;
//   }
//   .react-datepicker-popper[data-placement^='bottom']
//     .react-datepicker__triangle {
//     /* top: 0; */
//     visibility: hidden;
//     background: transparent;
//   }
//   .react-datepicker__time-container {
//     /* float: right;
//     border-left: 1px solid #aeaeae; */
//     /* background: white; */
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     width: 100%;
//   }
//   .react-datepicker__header.react-datepicker__header--time {
//     /* background: transparent; */
//   }
//   .react-datepicker__time-container
//     .react-datepicker__time
//     .react-datepicker__time-box
//     ul.react-datepicker__time-list {
//     /* background: blue; */
//     /* display: grid;
//     grid-template-columns: 1fr 1fr 1fr; */
//     list-style: none;
//     margin: 0;
//     /* height: calc(195px + (1.7rem / 2)); */
//     /* overflow-y: scroll; */
//     padding-right: 0;
//     padding-left: 0;
//     width: 100%;
//     padding-bottom: 5rem;
//     box-sizing: content-box;
//   }
// `;
const DatePickerComp = (props) => {
  // const [startDate, setStartDate] = useState();
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <div className='form-row'>
      <label htmlFor='datePicker'>Interview Appointment</label>
      <Wrapper className='form-input'>
        <DatePicker
          {...field}
          {...props}
          selected={(field.value && new Date(field.value)) || null}
          onChange={(val) => {
            setFieldValue(field.name, val);
          }}
          // selected={startDate}
          // onChange={(date) => setStartDate(date)}
          timeInputLabel='Time:'
          dateFormat='MM/dd/yyyy h:mm aa'
          showTimeInput
          placeholderText='Select Date/Time'
        />
      </Wrapper>
    </div>
  );
};

// working below
// const DatePickerComp = () => {
//   const [startDate, setStartDate] = useState();
//   console.log(startDate);
//   return (
//     <div className='form-row'>
//       <label htmlFor='datePicker'>Interview Appointment</label>
//       <Wrapper className='form-input'>
//         <DatePicker
//           selected={startDate}
//           onChange={(date) => setStartDate(date)}
//           timeInputLabel='Time:'
//           dateFormat='MM/dd/yyyy h:mm aa'
//           showTimeInput
//           placeholderText='Select Date/Time'
//         />
//       </Wrapper>
//     </div>
//   );
// };
//   const [startDate, setStartDate] = useState(new Date());
//   const ExampleCustomTimeInput = ({ date, value, onChange }) => (
//     <input
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       style={{ border: 'solid 1px pink' }}
//     />
//   );
//   return (
//     <Wrapper className='form-input'>
//       <DatePicker
//         selected={startDate}
//         onChange={(date) => setStartDate(date)}
//         showTimeInput
//         customTimeInput={<ExampleCustomTimeInput />}
//       />
//     </Wrapper>
//   );
// };

const Wrapper = styled.div`
  width: 100%;

  /* margin-top: -2rem; */
  input[type='text'] {
    width: 100%;
    /* padding: 8px 6px; */
    font-size: 0.95rem;
    /* font-family: var(--bodyFont); */
    /* padding-bottom: -5px; */
    outline-offset: 12px;
    border: none;
    background: transparent;
    letter-spacing: var(--letterSpacing);
    justify-self: start;
  }
  @media (max-width: 1200px) {
    .hide {
      display: none;
      background: blue;
    }
  }
`;
export default DatePickerComp;
