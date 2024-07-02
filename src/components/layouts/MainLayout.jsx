import { Outlet } from "react-router-dom";
import { GNB } from "./GNB";
import TopBar from "./TopBar";
import styled from "styled-components";

const Container = styled.div`
  padding-bottom: 40px;
  margin-bottom: 20px;
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
      <Container>
        <TopBar />
        <Outlet />
      </Container>
      <GNB />
    </>
  );
};
