import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createResource, updateResource } from '@/services/api'; 

// Generic submission function type
type SubmissionFunction<T> = (data: T) => Promise<void>;

// Submission options
interface UseFormSubmissionOptions<T> {
  endpoint: string; // Add endpoint parameter
  onSubmit?: SubmissionFunction<T>; // Make optional
  onSuccess?: (message: string, data?: T) => void;
  onError?: (message: string, error?: any) => void;
  redirectTo?: string;
  redirectDelay?: number;
  resetFormAfterSuccess?: boolean;
  successMessage?: (data: T) => string;
  errorMessage?: (error: any) => string;
  mode?: 'create' | 'update'; // Add mode
  id?: string; // For update mode
}

export const useFormSubmission = <T>({
  endpoint,
  onSubmit,
  onSuccess,
  onError,
  redirectTo,
  redirectDelay = 1500,
  resetFormAfterSuccess = true,
  successMessage,
  errorMessage,
  mode = 'create',
  id
}: UseFormSubmissionOptions<T>) => {
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const submitForm = async (data: T, resetForm?: () => void) => {
    setIsSubmitting(true);
    
    try {
      // Use custom onSubmit or default generic API call
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Default behavior using generic API
        if (mode === 'create') {
          const response = await createResource(endpoint, data);
          if (!response.success) {
            throw new Error(response.message);
          }
        } else if (mode === 'update' && id) {
          const response = await updateResource(endpoint, id, data);
          if (!response.success) {
            throw new Error(response.message);
          }
        }
      }
      
      // Reset form if requested
      if (resetFormAfterSuccess && resetForm) {
        resetForm();
      }
      
      // Show success message
      const message = successMessage ? successMessage(data) : 'Data berhasil disimpan!';
      if (onSuccess) {
        onSuccess(message, data);
      }
      
      // Navigate if redirect specified
      if (redirectTo) {
        setTimeout(() => {
          navigate(redirectTo);
        }, redirectDelay);
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Show error message
      const message = errorMessage ? errorMessage(error) : 'Terjadi kesalahan saat menyimpan data';
      if (onError) {
        onError(message, error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitForm,
  };
};