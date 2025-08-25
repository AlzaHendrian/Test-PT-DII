import { ApiResponse } from '@/types';
import { mockPatients } from '@/data/patients';

// Generic API response type

// Generic delay helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================
// GENERIC API FUNCTIONS
// ============================================

// Generic create function
export const createResource = async <T>(
  endpoint: string, 
  data: T,
  delayMs: number = 800
): Promise<ApiResponse<T & { id: string }>> => {
  console.log(`Creating ${endpoint}...`);
  
  try {
    await delay(delayMs);
    
    // if api call:
    // const response = await fetch(`/api/${endpoint}`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
    // return response.json();
    
    // Mock response
    const newItem = {
      ...data,
      id: Date.now().toString()
    } as T & { id: string };
    
    console.log(`${endpoint} created successfully`);
    return {
      success: true,
      data: newItem,
      message: 'Data berhasil disimpan'
    };
  } catch (error) {
    console.error(`Error creating ${endpoint}:`, error);
    return {
      success: false,
      message: 'Gagal menyimpan data'
    };
  }
};

// Generic fetch function
export const fetchResources = async <T>(
  endpoint: string,
  delayMs: number = 500
): Promise<ApiResponse<T[]>> => {
  console.log(`Fetching ${endpoint} data...`);
  
  try {
    await delay(delayMs);
    
    // API with Endpoint:
    // const response = await fetch(`/api/${endpoint}`);
    // return response.json();
    
    // Mock data based on endpoint
    let mockData: T[] = [];
    if (endpoint === 'patients') {
      mockData = [...mockPatients] as T[];
    }
    
    console.log(`${endpoint} data loaded successfully`);
    return {
      success: true,
      data: mockData,
      message: 'Data berhasil dimuat'
    };
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return {
      success: false,
      message: 'Gagal memuat data'
    };
  }
};

// Generic update function
export const updateResource = async <T>(
  endpoint: string, 
  id: string, 
  data: T,
  delayMs: number = 700
): Promise<ApiResponse<T>> => {
  console.log(`Updating ${endpoint}: ${id}`);
  
  try {
    await delay(delayMs);
    
    // Mock success response
    const updatedItem = { ...data, id } as T;
    
    console.log(`${endpoint} updated successfully`);
    return {
      success: true,
      data: updatedItem,
      message: 'Data berhasil diperbarui'
    };
  } catch (error) {
    console.error(`Error updating ${endpoint}:`, error);
    return {
      success: false,
      message: 'Gagal memperbarui data'
    };
  }
};

// Generic delete function
export const deleteResource = async (
  endpoint: string, 
  id: string,
  delayMs: number = 600
): Promise<ApiResponse> => {
  console.log(`Deleting ${endpoint}: ${id}`);
  
  try {
    await delay(delayMs);
    
    console.log(`${endpoint} deleted successfully`);
    return {
      success: true,
      message: 'Data berhasil dihapus'
    };
  } catch (error) {
    console.error(`Error deleting ${endpoint}:`, error);
    return {
      success: false,
      message: 'Gagal menghapus data'
    };
  }
};