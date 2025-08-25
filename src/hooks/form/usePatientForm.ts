import { PatientFormData } from '@/types';
import { validateForm as validatePatientForm } from '@/utils/validation';
import { useForm } from '../useForm';

// Initial data untuk patient form
const initialPatientData: PatientFormData = {
  nama: '',
  nik: '',
  diagnosa: '',
  tanggalMasuk: '',
  dokterPenanggungJawab: '',
  ruangan: '',
};

export const usePatientForm = () => {
  return useForm<PatientFormData>({
    initialData: initialPatientData,
    validate: validatePatientForm
  });
};