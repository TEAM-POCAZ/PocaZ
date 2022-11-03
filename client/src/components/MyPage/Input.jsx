const Input = ({ name, optionalText, placeholder, value, disabled }) => {
  return (
    <div>
      <div className="flex justify-between">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {name}
        </label>
        <span className="text-sm text-gray-500">{optionalText}</span>
      </div>

      <div className="mt-1">
        <input
          type="text"
          name={name}
          id={name}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder={placeholder}
          value={value}
          aria-describedby={name}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default Input;
