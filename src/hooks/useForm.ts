import { useState } from 'react';

// Generic validation function type
type ValidationFunction<T> = (formData: T) => Partial<T>;

// Generic form hook interface
interface UseFormOptions<T> {
  initialData: T;
  validate?: ValidationFunction<T>;
}

export const useForm = <T extends Record<string, any>>({
  initialData,
  validate
}: UseFormOptions<T>) => {
  
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Partial<T>>({});

  // Update single field - GENERIC
  const updateField = (name: keyof T, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Handle input change event - GENERIC
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateField(name as keyof T, value);
  };

  // Validate form using provided validation function
  const validateForm = () => {
    if (!validate) return true; // No validation needed
    
    const formErrors = validate(formData);
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData(initialData);
    setErrors({});
  };

  // Check if form has any data (berbeda dari initial)
  const hasData = () => {
    return Object.keys(formData).some(key => {
      const currentValue = String(formData[key]).trim();
      const initialValue = String(initialData[key]).trim();
      return currentValue !== initialValue;
    });
  };

  // Set form data (useful untuk edit mode)
  const setData = (data: T) => {
    setFormData(data);
    setErrors({});
  };

  // Set specific error
  const setFieldError = (name: keyof T, error: string) => {
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // Clear all errors
  const clearErrors = () => {
    setErrors({});
  };

  return {
    formData,
    errors,
    updateField,
    handleChange,
    validate: validateForm,
    resetForm,
    hasData,
    setData,
    setFieldError,
    clearErrors,
  };
};
