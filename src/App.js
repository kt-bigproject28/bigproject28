import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="signup" element={<SignupPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
