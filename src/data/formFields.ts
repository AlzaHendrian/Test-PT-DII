import { FormField, SelectOption } from '@/types';

// ============================================
// DROPDOWN OPTIONS DATA
// ============================================

export const dokterOptions: SelectOption[] = [
  { value: 'Dr. Sarah Johnson', label: 'Dr. Sarah Johnson' },
  { value: 'Dr. Michael Chen', label: 'Dr. Michael Chen' },
  { value: 'Dr. Linda Anderson', label: 'Dr. Linda Anderson' },
  { value: 'Dr. Robert Kim', label: 'Dr. Robert Kim' },
  { value: 'Dr. Emily Davis', label: 'Dr. Emily Davis' },
];

export const ruanganOptions: SelectOption[] = [
  { value: 'VIP-101', label: 'VIP-101' },
  { value: 'VIP-102', label: 'VIP-102' },
  { value: 'Kelas-1-205', label: 'Kelas-1-205' },
  { value: 'Kelas-1-206', label: 'Kelas-1-206' },
  { value: 'Kelas-2-150', label: 'Kelas-2-150' },
  { value: 'Kelas-2-151', label: 'Kelas-2-151' },
  { value: 'ICU-301', label: 'ICU-301' },
  { value: 'ICU-302', label: 'ICU-302' },
];

// ============================================
// FORM FIELDS CONFIGURATION
// ============================================

export const formFields: FormField[] = [
  {
    name: 'nama',
    label: 'Nama Pasien',
    type: 'text',
    placeholder: 'Masukkan nama lengkap pasien',
    required: true,
  },
  {
    name: 'nik',
    label: 'NIK',
    type: 'text',
    placeholder: 'Masukkan 16 digit NIK',
    required: true,
    maxLength: 16,
  },
  {
    name: 'diagnosa',
    label: 'Diagnosa',
    type: 'text',
    placeholder: 'Masukkan diagnosa penyakit',
    required: true,
  },
  {
    name: 'tanggalMasuk',
    label: 'Tanggal Masuk',
    type: 'date',
    required: true,
  },
  {
    name: 'dokterPenanggungJawab',
    label: 'Dokter Penanggung Jawab',
    type: 'select',
    placeholder: 'Pilih dokter penanggung jawab',
    required: true,
    options: dokterOptions,
  },
  {
    name: 'ruangan',
    label: 'Ruangan',
    type: 'select',
    placeholder: 'Pilih ruangan',
    required: true,
    options: ruanganOptions,
  },
];