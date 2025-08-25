import { PatientFormData } from '@/types';
import { usePatientStore } from '@/store/patientStore';
import { useFormSubmission } from '../useFormSubmission';

interface UsePatientSubmitProps {
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export const usePatientSubmit = ({ 
  onSuccess, 
  onError 
}: UsePatientSubmitProps = {}) => {
  
  const addPatient = usePatientStore((state) => state.addPatient);

  const submission = useFormSubmission<PatientFormData>({
    endpoint: 'patients',
    mode: 'create',
    onSubmit: async (patientData) => {
      await addPatient(patientData);
    },
    onSuccess,
    onError,
    redirectTo: '/patients',
    successMessage: (data) => `Pasien ${data.nama} berhasil ditambahkan!`
  });

  return {
    isSubmitting: submission.isSubmitting,
    submitPatient: submission.submitForm,
  };
};