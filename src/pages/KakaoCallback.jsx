import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../utils/AuthContext.jsx";

export default function KakaoCallback() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    // URL에서 인증 코드를 추출
    const code = new URL(window.location.href).searchParams.get("code");
    
    if (code) {
      axios.post("/auth/login/kakao", { code })
        .then(res => {
          
          const { data } = res;
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          localStorage.setItem('accessTokenExpires', data.accessTokenExpires);
          localStorage.setItem('userId', data.memberId);
          localStorage.setItem('user', JSON.stringify({
            email: data.email,
            username: data.username,
            imageUrl: data.imageUrl,
          }));

          // AuthContext의 사용자 정보를 업데이트합니다.
          setUser({
            email: data.email,
            username: data.username,
            imageUrl: data.imageUrl,
          });

          // 로그인 성공 후, 이전 페이지로 이동하거나 메인 페이지로 이동합니다.
          // history 스택에 이전 페이지가 있으면 뒤로 가고, 없으면 메인으로 갑니다.
          if (window.history.length > 1) {
            window.history.back();
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          console.error("카카오 로그인 콜백 에러:", err);
          alert("카카오 로그인에 실패했습니다.");
          navigate("/Login");
        });
    } else {
      // 코드가 없는 경우 에러 처리
      alert("카카오 인증에 실패했습니다.");
      navigate("/Login");
    }
  }, [navigate, setUser]);

  // 사용자에게 로딩 중임을 알려주는 화면
  return <div>카카오 로그인 중...</div>;
}