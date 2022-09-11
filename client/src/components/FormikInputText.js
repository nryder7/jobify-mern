import { useField } from 'formik';
import styled from '@emotion/styled';

const FormikText = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Div>
        <label htmlFor={props.id || props.name}>{label}</label>
        {meta.touched && meta.error ? (
          <span className='error'>{meta.error}</span>
        ) : null}
      </Div>
      <input className='form-input' {...field} {...props} />
      {/* <input className='text-input' {...field} {...props} /> */}
    </>
  );
};

const Div = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default FormikText;
