import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import MainPage from "./pages/MainPage";
import { MainLayout } from "./components/layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
        </Route>
        <Route path="signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
