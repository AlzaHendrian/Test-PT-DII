import { Link } from 'react-router-dom';
import { PatientTable } from '@/components/tables/PatientTable';

export const PatientListPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
            {/* Title Section */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Daftar Pasien Rawat Inap
              </h1>
              <p className="text-gray-600 mt-1">
                Kelola data pasien yang sedang menjalani rawat inap
              </p>
            </div>

            {/* Action Button */}
            <Link
              to="/patients/add"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Tambah Pasien
            </Link>
          </div>
        </div>

        <PatientTable />
        
        <Link
          to="/patients/add"
          className="fixed bottom-6 right-6 md:hidden w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
};