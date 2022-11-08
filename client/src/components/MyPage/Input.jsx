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
      <div className="flex justify-between">
        <label
          htmlFor={property}
          className="block text-sm font-medium text-gray-700"
        >
          {property}
        </label>
        <span className="text-sm text-gray-500">{optionalText}</span>
      </div>

      <div className="mt-1">
        <input
          type="text"
          name={property}
          id={property}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-300"
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
