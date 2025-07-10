import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UseKeyboardOpen } from "../utils/useKeyboardOpen";
import Button from "../components/button"
import Header from "../components/sign-header"
import InputField from "../components/InputField"
// import UserHeader from "../components/user-header";
import GoLogin from "../assets/로그인가기.svg"

export default function SignUp() {
    const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:8080';
    const [username, setName] = useState(""); // 이름
    const [email, setEmail] = useState(""); // 이메일
    const [password, setPassword] = useState(""); // 비번
    const [passwordConfirm, setPasswordConfirm] = useState(""); // 비번 확인
    // const [agree, setAgree] = useState(false);
    //오류 상태 관리
    const [emailError, setEmailError] = useState(""); // 이메일
    const [emailSuccess, setEmailSuccess] = useState("");
    const [passwordError, setPasswordError] = useState(""); // 비번
    const [passwordConfirmError, setPasswordConfirmError] = useState(""); // 비번 확인
    const [isEmailChecked, setIsEmailChecked] = useState(false); // 사용자가 중복 확인을 하지 않고 회원가입 버튼을 누른 경우

    const navigate = useNavigate(); // 이동 관련
    const isKeyboardOpen = UseKeyboardOpen(); // 키보드 상태


    // 회원가입 로직
    const handleSignUp = async () => {
        // 필드 미입력
        if (!username || !email || !password || !passwordConfirm) {
            alert("모든 필드를 입력해주세요.");
            return;
        }
        // 이메일 중복검사 안 했을 경우
        if (!isEmailChecked) {
            alert("이메일 중복검사를 먼저 진행해주세요.");
            return;
        }
        // 비밀번호 확인
        if (password !== passwordConfirm) {
            setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
            return;
        } else {
            setPasswordConfirmError("");
        }
        // 비밀번호 8자 이상 확인
        if (password.length < 8) {
            setPasswordError("비밀번호는 8자 이상이어야 합니다.");
            return;
        } else {
            setPasswordError("");
        }
        // 약관 비동의
        // if (!agree) {
        //     alert("약관에 동의해야 합니다.");
        //     return;
        // }
        try {
            // 회원가입 정보 테스트
            console.log('회원가입 데이터 확인:');
            console.log('이름:', username);
            console.log('이메일:', email);
            console.log('비밀번호:', password);
            console.log('비밀번호 확인:', passwordConfirm);
            console.log('약관 동의:', agree);
            const response = await axios.post(`${apiBase}/api/v1/members/signup`, { // api 호출은 api 명세에 따라 수정 필요(env 형식으로 관리 필요)
                username,
                email,
                password,
            });
            if (response.status === 201) { // 로그인 성공 시 
                console.log("회원가입 성공");
                alert("회원가입에 성공했습니다.");
                navigate("/LogIn"); // 로그인 페이지로 이동
            } else {
                console.error("회원가입 오류 발생");
                alert("회원가입 중 오류가 발생하였습니다.");
            }
        } catch (error) {
            console.error("회원가입 실패", error);
            alert("회원가입에 실패했습니다.");
        }
    };
    //이메일 중복 검사
    const handleCheckEmail = async () => {
        // 이메일 형식 확인
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("이메일 형식을 지켜 작성해주세요");
            return;
        }
        try {
            const response = await axios.get(`${apiBase}/api/v1/members/email/${email}`);

            // 사용 가능 (200 OK)
            if (response.data === true || response.data === "true") {
                setEmailError("");
                setEmailSuccess("사용가능한 이메일입니다!");
                setIsEmailChecked(true);
            } else {
                setEmailError("이미 존재하는 이메일입니다");
                setEmailSuccess("");
                setIsEmailChecked(false);
            }
        } catch (error) {
            if (error.response?.status === 400) {
                setEmailError("이미 존재하는 이메일입니다");
                setEmailSuccess("");
                setIsEmailChecked(false);
            } else {
                setEmailError("서버 오류가 발생했습니다");
                setEmailSuccess("");
                setIsEmailChecked(false);
            }
        }
    };

    return (
        <div className="flex flex-col items-center">
            <Link to="/Login" className="self-start">
                <img src={GoLogin} alt="로그인으로 이동" className="ml-[20px]" />
            </Link>
            <Header title="회원가입" />
            {/* 사용자 입력창 */}
            <div className="w-full mt-4 flex flex-col mx-auto gap-4 mb-[36px] px-[24px]">
                <InputField label="이름" type="text" value={username} onChange={(e) => setName(e.target.value)} placeholder="이름을입력해주세요" />
                {/* 이메일 입력 란 */}
                <div className="relative">
                    <InputField label="이메일" type="email" value={email} placeholder="이메일을 입력해주세요" error={emailError} success={emailSuccess}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setIsEmailChecked(false);
                            setEmailError("");
                            setEmailSuccess(""); // 메시지 상태 초기화
                        }}
                    />
                    <Button label="중복 확인" className="absolute right-[10px] bottom-0 -translate-y-1/2 !w-[76px] !h-[35px] !border-[1px] !border-[#0066FF] !bg-[#0066FF26] !text-[#111111] !text-[14px] font-medium" onClick={handleCheckEmail} />
                </div>
                <InputField label="비밀번호" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="8자 이상 입력해주세요" error={passwordError} />
                <InputField label="비밀번호 확인" type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} placeholder="비밀번호를 적어주세요" error={passwordConfirmError} />
                {/* <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                    />
                    약관 동의하기
                </label> */}

            </div>
            <div className={`fixed bottom-[30px] md:bottom-[110px] z-50 ${isKeyboardOpen ? '!bottom-[10px]' : ''}`}>
                <Button label="회원가입" onClick={handleSignUp}  />
            </div>
        </div>
    );
}
