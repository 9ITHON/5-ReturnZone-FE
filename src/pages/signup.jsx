import { useState } from "react";
import axios from "axios";
import Button from "../components/button"
import Header from "../components/header"
import InputField from "../components/input-field"

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [agree, setAgree] = useState(false);

    const handleSignUp = async () => {
        // 필드 미입력
        if (!name || !email || !password || !passwordConfirm) {
            alert("모든 필드를 입력해주세요.");
            return;
        }
        // 비밀번호 확인
        if (password !== passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        // 비밀번호 8자 이상 확인
        if (password.length < 8) {
            alert("비밀번호는 8자 이상이어야 합니다.");
            return;
        }
        // 약관 비동의
        if (!agree) {
            alert("약관에 동의해야 합니다.");
            return;
        }
        try {
            const response = await axios.post("http://localhost:8080/signup", { // api 호출은 api 명세에 따라 수정 필요
                name,
                email,
                password,
            });
            if (response.status == 200) { // 로그인 성공 시 
                console.log("로그인 성공");
                alert("회원가입에 성공했습니다.");
                navigate("/SignIn"); // 로그인 페이지로 이동
            }else{
                console.error("회원가입 오류 발생",error);
                alert("회원가입 중 오류가 발생하였습니다.");
            }

        } catch (error) {
            console.error("회원가입 실패", error);
            alert("회원가입에 실패했습니다.");
        }
    };

    return (
        <div className="flex flex-col items-center">
            <Header />
            <div className="w-[370px] mt-4 flex flex-col gap-4">
                <h1 className="text-[32px] font-bold">회원가입</h1>

                <InputField
                    label="이름"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="입력해주세요."
                />
                <InputField
                    label="이메일"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일 입력해주세요."
                />
                <InputField
                    label="비밀번호"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="8자 이상 입력해주세요."
                />
                <InputField
                    label="비밀번호 확인"
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    placeholder="비밀번호 확인."
                />

                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                    />
                    약관 동의하기
                </label>

                <Button
                    label="회원가입"
                    onClick={handleSignUp}
                    disabled={!agree}
                />
            </div>
        </div>
    );
}