import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { PatientListPage } from '@/pages/PatientListPage';
import { PatientFormPage } from '@/pages/PatientFormPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/patients" replace />} />
            <Route path="/patients" element={<PatientListPage />} />
            <Route path="/patients/add" element={<PatientFormPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;