const FormRow = ({ type, name, value, handleChange, options, id }) => {
  const labelText = name.split(/(?=[A-Z])/).join(' ');
  return (
    <div className='form-row'>
      <label className='form-label' htmlFor={name}>
        {labelText}
      </label>
      {type !== 'select' && (
        <input
          type={type}
          name={name}
          value={value}
          id={id}
          className='form-input'
          onChange={handleChange}
        />
      )}
      {type === 'select' && (
        <select
          className='form-select'
          name={name}
          onChange={handleChange}
          value={value}
        >
          {options.map((option) => {
            const upperCase = [...option.value];
            upperCase[0] = upperCase[0].toUpperCase();
            return (
              <option key={option.id} value={option.value}>
                {upperCase.join('')}
              </option>
            );
          })}
        </select>
      )}
    </div>
  );
};
export default FormRow;
