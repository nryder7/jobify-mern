import { useField } from 'formik';

const FormikCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
      <label className='checkbox'>
        <input {...field} {...props} type='checkbox' />
        {children}
      </label>
    </>
  );
};

export default FormikCheckbox;
