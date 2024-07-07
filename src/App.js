import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ExpectedReturnPage from "./pages/ExpectedReturnPage";
import CropsPage from './pages/CropsPage';
import SoilPage from './pages/SoilPage'; 
import FertilizerPage from './pages/FertilizerPage';
import DiagnosisPage from './pages/DiagnosisPage';
import InfoPage from './pages/InfoPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="Crops" element={<CropsPage />} />
        <Route path="ExpectedReturn" element={<ExpectedReturnPage />} />
        <Route path="Soil" element={<SoilPage />} />
        <Route path="Fertilizer" element={<FertilizerPage />} />
        <Route path="Diagnosis" element={<DiagnosisPage />} />
        <Route path="Info" element={<InfoPage />} />
      </Routes>
    </Router>
  );
}
export default App;