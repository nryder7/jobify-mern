import { useField } from 'formik';
import styled from '@emotion/styled';

const FormikSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Div>
        <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
        {meta.touched && meta.error ? (
          <span className='error'>{meta.error}</span>
        ) : null}
      </Div>
      <StyledSelect {...field} {...props} className='form-select' />
    </>
  );
};

const Div = styled.div`
  display: flex;
  justify-content: space-between;
`;

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
  /* margin-top: 1rem; */
  margin-top: 0;
`;

export default FormikSelect;
