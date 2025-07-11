import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../utils/AuthContext.jsx";

export default function KakaoCallback() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      axios.post("/api/v1/auth/kakao/callback", { code })
        .then(res => {
          setUser(res.data); // { email, username, imageUrl }
          navigate("/"); // 메인으로 이동
        })
        .catch(() => {
          alert("카카오 로그인에 실패했습니다.");
          navigate("/Login");
        });
    }
  }, [navigate, setUser]);

  return <div>카카오 로그인 중...</div>;
} 