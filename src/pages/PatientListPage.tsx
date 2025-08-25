import { Link } from 'react-router-dom';
import { PatientTable } from '@/components/tables/PatientTable';

export const PatientListPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header dengan tombol tambah */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Daftar Pasien Rawat Inap</h1>
          <p className="text-gray-600 mt-2">Kelola data pasien yang sedang menjalani rawat inap</p>
        </div>
        
        <Link
          to="/patients/add"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Tambah Pasien
        </Link>
      </div>

      {/* Table Component */}
      <PatientTable />
    </div>
  );
};