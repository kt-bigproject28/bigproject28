import { Outlet } from "react-router-dom";
import { GNB } from "./GNB";
import styled from "styled-components";
import TopBar from "./TopBar";

// 스타일링된 컴포넌트 정의
const Main = styled.main`
  margin-bottom: 0px;
`;

export const MainLayout = () => {
  /* 로그인 후 토큰 가져오면 보여질 메인 레이아웃 (상단바, 하단바)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getUserInfoThunk())
        .then(unwrapResult)
        .catch(() => {
          localStorage.removeItem("token");
          navigate("/login");
        });
    }
  }, [dispatch, navigate]);
  */

  return (
    <>
      <Main>
        <TopBar />
        <Outlet />
      </Main>
      <GNB />
    </>
  );
};
