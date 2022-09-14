import { useField } from 'formik';
import styled from '@emotion/styled';

const FormikSelect = ({ all = false, options, label, ...props }) => {
  const [field, meta] = useField(props);

  const filteredOptions = all
    ? options
    : options.filter((option) => option.id !== 0);

  return (
    <div className='form-row'>
      <StyledDiv>
        <label className='form-label' htmlFor={props.id || props.name}>
          {label}
        </label>
        {meta.touched && meta.error ? (
          <span className='error'>{meta.error}</span>
        ) : null}
      </StyledDiv>
      <select {...field} {...props} className='form-select'>
        {filteredOptions.map((option) => {
          return (
            <option key={option.id} value={option.value}>
              {option.textContent}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

// const StyledErrorMessage = styled.div`
//   font-size: 12px;
//   color: var(--red-600);
//   width: 400px;
//   margin-top: 0.25rem;
//   &:before {
//     content: '❌ ';
//     font-size: 10px;
//   }
//   @media (prefers-color-scheme: dark) {
//     color: var(--red-300);
//   }
// `;

export default FormikSelect;
