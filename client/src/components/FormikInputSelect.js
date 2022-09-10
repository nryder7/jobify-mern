import { useField } from 'formik';
import styled from '@emotion/styled';

const FormikSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
        {meta.touched && meta.error ? (
          <span className='error'>{meta.error}</span>
        ) : null}
      </div>
      <StyledSelect {...field} {...props} className='form-select' />
      {/* {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null} */}
    </>
  );
};

const StyledSelect = styled.select`
  color: var(--blue);
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: var(--red-600);
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: '❌ ';
    font-size: 10px;
  }
  @media (prefers-color-scheme: dark) {
    color: var(--red-300);
  }
`;

const StyledLabel = styled.label`
  margin-top: 1rem;
`;

export default FormikSelect;
