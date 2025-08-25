import { PatientFormData } from '@/types';

// ============================================
// VALIDATION FUNCTIONS
// ============================================

// Validate single field
export const validateField = (name: keyof PatientFormData, value: string): string | null => {
  // Empty check for required fields
  if (!value.trim()) {
    const labels = {
      nama: 'Nama pasien',
      nik: 'NIK',
      diagnosa: 'Diagnosa',
      tanggalMasuk: 'Tanggal masuk',
      dokterPenanggungJawab: 'Dokter penanggung jawab',
      ruangan: 'Ruangan'
    };
    return `${labels[name]} wajib diisi`;
  }

  // NIK specific validation
  if (name === 'nik') {
    if (value.length !== 16) {
      return 'NIK harus 16 digit';
    }
    if (!/^\d+$/.test(value)) {
      return 'NIK hanya boleh berisi angka';
    }
  }

  return null; // No error
};

// Validate entire form
export const validateForm = (formData: PatientFormData): Partial<PatientFormData> => {
  const errors: Partial<PatientFormData> = {};
  
  // Check each field
  (Object.keys(formData) as (keyof PatientFormData)[]).forEach(fieldName => {
    const error = validateField(fieldName, formData[fieldName]);
    if (error) {
      errors[fieldName] = error;
    }
  });

  return errors;
};