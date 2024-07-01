import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ExpectedReturnPage from "./pages/ExpectedReturnPage";
import CropsPage from './pages/CropsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="Crops" element={<CropsPage />} />
        <Route path="ExpectedReturn" element={<ExpectedReturnPage />} />
      </Routes>
    </Router>
  );
}
export default App;
