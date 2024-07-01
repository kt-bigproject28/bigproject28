import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { MainLayout } from "./components/layouts/MainLayout";
import BoardPage from "./pages/BoardPage";
import BuyBoardPage from "./pages/BuyBoardPage";
import SellBoardPage from "./pages/SellBoardPage";
import MyBoardPage from "./pages/MyBoardPage";
import PostDetailPage from "./pages/PostDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="board" element={<BoardPage />} />
          <Route path="buyboard" element={<BuyBoardPage />} />
          <Route path="sellboard" element={<SellBoardPage />} />
          <Route path="myboard" element={<MyBoardPage />} />
          <Route path="post/:id" element={<PostDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
