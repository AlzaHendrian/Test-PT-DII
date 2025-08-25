import { useEffect } from 'react';
import { usePatientStore } from '@/store/patientStore';
import { useDebouncedSearch } from '@/hooks/useDebouncedSearch';
import { Input } from '@/components/ui/Input'; // Import UI Input
import { Patient } from '@/types/index';

export const PatientTable = () => {
  const {
    isLoading,
    searchTerm: storeSearchTerm,
    sortBy,
    sortOrder,
    currentPage,
    loadPatients,
    setSearchTerm,
    setSorting,
    setCurrentPage,
    getPaginatedPatients,
    getTotalPages,
    getFilteredPatients,
  } = usePatientStore();

  // Debounced search hook
  const {
    searchTerm,
    isSearching,
    handleSearchChange,
    clearSearch
  } = useDebouncedSearch({
    onSearch: setSearchTerm,
    delay: 500
  });

  const paginatedPatients = getPaginatedPatients();
  const totalPages = getTotalPages();
  const filteredPatients = getFilteredPatients();

  // Load patients on component mount
  useEffect(() => {
    loadPatients();
  }, [loadPatients]);

  // Handle sorting
  const handleSort = (column: 'nama' | 'tanggalMasuk') => {
    const newSortOrder = sortBy === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSorting(column, newSortOrder);
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  // ============================================
  // SEARCH ICONS
  // ============================================
  
  const searchIcon = (
    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
    </svg>
  );

  const rightContent = (
    <>
      {/* Loading indicator saat debouncing */}
      {isSearching && (
        <svg className="animate-spin h-4 w-4 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {/* Clear search button */}
      {searchTerm && !isSearching && (
        <button
          onClick={clearSearch}
          className="hover:text-gray-600 text-gray-400 transition-colors"
          type="button"
          title="Clear search"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </>
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-gray-600 text-sm sm:text-base">Memuat data pasien...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header dengan Search dan Sorting - Responsive */}
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Daftar Pasien Aktif</h2>
          
          <div className="flex flex-col space-y-4">
            {/* CLEAN SEARCH INPUT - Using UI Input component */}
            <Input
              placeholder="Cari nama atau NIK..."
              value={searchTerm}
              onChange={handleSearchChange}
              leftIcon={searchIcon}
              rightContent={rightContent}
              className="py-2 sm:py-3 text-sm sm:text-base"
            />

            {/* Sorting Buttons - Stack on mobile */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="text-sm text-gray-600 font-medium">Urutkan:</span>
              
              <div className="flex flex-col sm:flex-row gap-2">
                {/* Sort by Name */}
                <button
                  onClick={() => handleSort('nama')}
                  className={`inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                    sortBy === 'nama'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Nama
                  {sortBy === 'nama' && (
                    <svg className={`w-4 h-4 ml-2 transition-transform ${sortOrder === 'desc' ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>

                {/* Sort by Date */}
                <button
                  onClick={() => handleSort('tanggalMasuk')}
                  className={`inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                    sortBy === 'tanggalMasuk'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Tanggal
                  {sortBy === 'tanggalMasuk' && (
                    <svg className={`w-4 h-4 ml-2 transition-transform ${sortOrder === 'desc' ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results Info */}
        <div className="mt-4 text-sm text-gray-600">
          Menampilkan {paginatedPatients.length} dari {filteredPatients.length} pasien
          {storeSearchTerm && (
            <span className="block sm:inline sm:ml-1">
              untuk pencarian "<span className="font-medium">{storeSearchTerm}</span>"
            </span>
          )}
        </div>
      </div>

      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama Pasien
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                NIK
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Diagnosa
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal Masuk
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dokter
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ruangan
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedPatients.length > 0 ? (
              paginatedPatients.map((patient: Patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{patient.nama}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-mono">{patient.nik}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {patient.diagnosa}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(patient.tanggalMasuk)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.dokterPenanggungJawab}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      patient.ruangan.startsWith('VIP') ? 'bg-purple-100 text-purple-800' :
                      patient.ruangan.startsWith('ICU') ? 'bg-red-100 text-red-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {patient.ruangan}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-lg font-medium text-gray-900 mb-1">Tidak ada data pasien</p>
                    <p className="text-gray-500 text-center">
                      {storeSearchTerm ? 'Tidak ditemukan pasien yang sesuai dengan pencarian' : 'Belum ada pasien yang terdaftar'}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View - Visible on mobile and tablet */}
      <div className="lg:hidden">
        {paginatedPatients.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {paginatedPatients.map((patient: Patient) => (
              <div key={patient.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col space-y-3">
                  {/* Header - Nama dan NIK */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{patient.nama}</h3>
                      <p className="text-sm text-gray-600 font-mono mt-1">NIK: {patient.nik}</p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        patient.ruangan.startsWith('VIP') ? 'bg-purple-100 text-purple-800' :
                        patient.ruangan.startsWith('ICU') ? 'bg-red-100 text-red-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {patient.ruangan}
                      </span>
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Diagnosa */}
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Diagnosa</p>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {patient.diagnosa}
                      </span>
                    </div>

                    {/* Tanggal Masuk */}
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Tanggal Masuk</p>
                      <p className="text-sm text-gray-900">{formatDate(patient.tanggalMasuk)}</p>
                    </div>

                    {/* Dokter - Full width on small screens */}
                    <div className="sm:col-span-2">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Dokter Penanggung Jawab</p>
                      <p className="text-sm text-gray-900">{patient.dokterPenanggungJawab}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 sm:p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg font-medium text-gray-900 mb-2">Tidak ada data pasien</p>
            <p className="text-gray-500 text-center">
              {storeSearchTerm ? 'Tidak ditemukan pasien yang sesuai dengan pencarian' : 'Belum ada pasien yang terdaftar'}
            </p>
          </div>
        )}
      </div>

      {/* Pagination - Responsive */}
      {totalPages > 1 && (
        <div className="px-4 sm:px-6 py-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="text-sm text-gray-700 text-center sm:text-left">
              Halaman {currentPage} dari {totalPages}
            </div>
            
            <div className="flex items-center justify-center sm:justify-end space-x-1 sm:space-x-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-2 sm:px-3 py-1 sm:py-2 rounded text-xs sm:text-sm font-medium transition-colors ${
                  currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span className="hidden sm:inline">Sebelumnya</span>
                <span className="sm:hidden">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </span>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-1">
                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-2 sm:px-3 py-1 sm:py-2 rounded text-xs sm:text-sm font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-2 sm:px-3 py-1 sm:py-2 rounded text-xs sm:text-sm font-medium transition-colors ${
                  currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span className="hidden sm:inline">Selanjutnya</span>
                <span className="sm:hidden">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};