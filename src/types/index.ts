// ============================================
// PATIENT TYPES - Data Structure
// ============================================

export interface Patient {
  id: string;
  nama: string;
  nik: string;
  diagnosa: string;
  tanggalMasuk: string;
  dokterPenanggungJawab: string;
  ruangan: string;
}

export interface PatientFormData {
  nama: string;
  nik: string;
  diagnosa: string;
  tanggalMasuk: string;
  dokterPenanggungJawab: string;
  ruangan: string;
}

// ============================================
// FORM TYPES - UI Configuration
// ============================================

export interface FormField {
  name: keyof PatientFormData;
  label: string;
  type: 'text' | 'date' | 'select';
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  options?: SelectOption[];
}

export interface SelectOption {
  value: string;
  label: string;
}

// ============================================
// STATE TYPES - Application State
// ============================================

export interface PatientState {
  patients: Patient[];
  isLoading: boolean;
  searchTerm: string;
  sortBy: 'nama' | 'tanggalMasuk';
  sortOrder: 'asc' | 'desc';
  currentPage: number;
  patientsPerPage: number;
}

// ============================================
// STATE TYPES - API State
// ============================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}