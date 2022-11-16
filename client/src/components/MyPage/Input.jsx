const Input = ({
  property,
  optionalText,
  placeholder,
  value,
  disabled,
  setValue,
}) => {
  return (
    <div>
      <div className='flex justify-between'>
        <label htmlFor={property} className='block mb-1.5 font-bold text-lg'>
          {property}
        </label>
        <span className='text-sm text-gray-500'>{optionalText}</span>
      </div>

      <div className='mb-10'>
        <input
          type='text'
          name={property}
          id={property}
          className='block w-full mb-2.5 p-2.5 rounded border-gray-100 border focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100'
          placeholder={placeholder}
          value={value}
          aria-describedby={property}
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Input;
