import { create } from 'zustand';
import { Patient, PatientState, PatientFormData } from '@/types/index';
import { fetchResources, createResource } from '@/services/api';

interface PatientStore extends PatientState {
  // Actions
  loadPatients: () => Promise<void>;
  addPatient: (patientData: PatientFormData) => Promise<void>; // Change to async
  setSearchTerm: (term: string) => void;
  setSorting: (sortBy: 'nama' | 'tanggalMasuk', sortOrder: 'asc' | 'desc') => void;
  setCurrentPage: (page: number) => void;
  
  // Computed properties
  getFilteredPatients: () => Patient[];
  getPaginatedPatients: () => Patient[];
  getTotalPages: () => number;
}

export const usePatientStore = create<PatientStore>((set, get) => ({
  // Initial state
  patients: [],
  isLoading: false,
  searchTerm: '',
  sortBy: 'tanggalMasuk',
  sortOrder: 'desc',
  currentPage: 1,
  patientsPerPage: 5,

  // Actions
  loadPatients: async () => {
    set({ isLoading: true });
    try {
      // Using generic fetchResources
      const response = await fetchResources<Patient>('patients');
      
      if (response.success && response.data) {
        set({ patients: response.data, isLoading: false });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Failed to load patients:', error);
      set({ isLoading: false });
    }
  },

  // Updated addPatient to use generic createResource
  addPatient: async (patientData: PatientFormData) => {
    try {
      // Call API using generic function
      const response = await createResource('patients', patientData);
      
      if (response.success && response.data) {
        // Add to store
        set((state) => ({
          patients: [response.data!, ...state.patients],
          currentPage: 1, // Reset to first page after adding
        }));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Failed to add patient:', error);
      throw error; // Re-throw untuk handling di component
    }
  },

  // Rest of the code tetap sama...
  setSearchTerm: (term: string) => {
    set({ searchTerm: term, currentPage: 1 });
  },

  setSorting: (sortBy: 'nama' | 'tanggalMasuk', sortOrder: 'asc' | 'desc') => {
    set({ sortBy, sortOrder, currentPage: 1 });
  },

  setCurrentPage: (page: number) => {
    set({ currentPage: page });
  },

  // Computed functions tetap sama
  getFilteredPatients: () => {
    const { patients, searchTerm, sortBy, sortOrder } = get();
    
    let filtered = patients.filter((patient) =>
      patient.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.nik.includes(searchTerm)
    );

    filtered.sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'nama') {
        comparison = a.nama.localeCompare(b.nama);
      } else if (sortBy === 'tanggalMasuk') {
        comparison = new Date(a.tanggalMasuk).getTime() - new Date(b.tanggalMasuk).getTime();
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  },

  getPaginatedPatients: () => {
    const { currentPage, patientsPerPage } = get();
    const filtered = get().getFilteredPatients();
    
    const startIndex = (currentPage - 1) * patientsPerPage;
    const endIndex = startIndex + patientsPerPage;
    
    return filtered.slice(startIndex, endIndex);
  },

  getTotalPages: () => {
    const { patientsPerPage } = get();
    const filtered = get().getFilteredPatients();
    return Math.ceil(filtered.length / patientsPerPage);
  },
}));