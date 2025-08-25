interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  name?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  error?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  name,
  placeholder,
  value,
  onChange,
  options,
  error,
  className = '',
  disabled = false,
  required = false
}) => {
  const baseClasses = `
    w-full px-3 py-2 border rounded-md 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
    transition-all duration-200
    ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'}
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
  `.trim().replace(/\s+/g, ' ');

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className={`${baseClasses} ${className}`}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};