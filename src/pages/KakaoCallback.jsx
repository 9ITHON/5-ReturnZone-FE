import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/apiService";

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    if (code) {
      apiService.kakaoLoginCallback(code)
        .then((data) => {
          if (data.accessToken) {
            localStorage.setItem("auth_token", data.accessToken);
          }
          if (data.userId) {
            localStorage.setItem("user_id", data.userId);
          }
          navigate("/");
        })
        .catch(() => {
          alert("카카오 로그인 실패");
          navigate("/login");
        });
    }
  }, [navigate]);

  return <div>카카오 로그인 중...</div>;
};

export default KakaoCallback; 