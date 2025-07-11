import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { loginWithKakao } from '../utils/kakao';
import kakaoIcon from '../assets/카카오.svg';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // 에러 메시지 초기화
    setEmailError('');
    setPasswordError('');
    setIsLoading(true);

    // 기본 유효성 검사
    if (!email) {
      setEmailError('이메일을 입력해주세요');
      setIsLoading(false);
      return;
    }
    if (!password) {
      setPasswordError('비밀번호를 입력해주세요');
      setIsLoading(false);
      return;
    }
    if (password.length < 8) {
      setPasswordError('비밀번호는 8자 이상 입력해주세요');
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiService.login({ email, password }); // 수정
      console.log('입력된 이메일:', email);
      console.log('입력된 비밀번호:', password); // 테스트
      
      console.log('로그인 성공:', response);

      // 토큰 저장
      if (response.token || response.accessToken) {
        localStorage.setItem('authToken', response.token || response.accessToken);
      }

      // 자동 로그인 체크
      if (remember) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('savedEmail', email);
      } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('savedEmail');
      }

      // 대시보드나 메인 페이지로 이동
      navigate('/dashboard');

    } catch (error) {
      console.error('로그인 실패:', error);
      
      if (error.response) {
        const { status, data } = error.response;
        
        switch (status) {
          case 400:
            if (data?.message?.includes('email') || data?.field === 'email') {
              setEmailError('올바른 이메일 형식이 아닙니다');
            } else if (data?.message?.includes('password') || data?.field === 'password') {
              setPasswordError('비밀번호가 일치하지 않습니다');
            } else {
              setEmailError('입력 정보를 확인해주세요');
            }
            break;
          case 401:
            setEmailError('이메일 또는 비밀번호가 잘못되었습니다');
            break;
          case 404:
            setEmailError('존재하지 않는 계정입니다');
            break;
          case 500:
            alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            break;
          default:
            alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
      } else if (error.request) {
        alert('서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.');
      } else {
        alert(`로그인 요청 설정 중 오류 발생: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = () => {
    navigate('/SignUp');
  };

  const handleKakaoLogin = async () => {
    try {
      setIsLoading(true);
      
      // 카카오 SDK를 통한 로그인
      const kakaoResult = await loginWithKakao();
      console.log('카카오 로그인 결과:', kakaoResult);

      // 서버에 카카오 토큰 전송하여 우리 앱 토큰 받기
      const serverResponse = await apiService.kakaoLogin(
        kakaoResult.accessToken,
        kakaoResult.userInfo
      );

      // 토큰 저장 및 로그인 처리
      if (serverResponse.token || serverResponse.accessToken) {
        localStorage.setItem('authToken', serverResponse.token || serverResponse.accessToken);
        localStorage.setItem('loginType', 'kakao');
        navigate('/dashboard');
      }

    } catch (error) {
      console.error('카카오 로그인 오류:', error);
      
      if (error.message?.includes('카카오 SDK')) {
        alert('카카오 로그인 서비스에 일시적인 문제가 있습니다. 나중에 다시 시도해주세요.');
      } else if (error.message?.includes('사용자가 취소')) {
        // 사용자가 로그인을 취소한 경우, 별도 알림 없이 처리
        console.log('사용자가 카카오 로그인을 취소했습니다.');
      } else {
        alert('카카오 로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트 시 자동 로그인 체크
  React.useEffect(() => {
    const rememberMe = localStorage.getItem('rememberMe');
    const savedEmail = localStorage.getItem('savedEmail');
    
    if (rememberMe === 'true' && savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  return (
    <div className="flex flex-col justify-start items-center w-[390px] h-[844px] gap-2.5 mx-auto">
      <div className="flex flex-col justify-start items-center self-stretch flex-grow relative gap-[38px] bg-white pt-2 mt-12">
        {/* Logo and Title */}
        <div className="flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative">
          <svg
            width={96}
            height={42}
            viewBox="0 0 96 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-grow-0 flex-shrink-0 w-24 h-[42px] relative"
            preserveAspectRatio="none"
          >
            <path
              d="M72.6092 26.7147C69.4653 26.7147 68.1118 25.6855 68.1118 22.8236V21.7944C68.1118 18.9606 69.5076 17.8892 72.6092 17.8892C75.7249 17.8892 77.0924 18.9606 77.0924 21.7944V22.8236C77.0924 25.6855 75.7249 26.7147 72.6092 26.7147ZM72.6092 24.7268C74.0049 24.7268 74.6675 24.3462 74.6675 22.7249V21.879C74.6675 20.3846 74.2164 19.877 72.6092 19.877C71.002 19.877 70.5508 20.3846 70.5508 21.879V22.7249C70.5508 24.3462 71.2134 24.7268 72.6092 24.7268Z"
              fill="#111111"
            />
            <path
              d="M9.94336 24.7552V20.7231C9.94336 18.848 10.5778 18.0303 12.4529 18.0303H16.0056C17.8807 18.0303 18.501 18.7493 18.5715 20.4834V21.4421C18.5715 22.7109 17.8666 23.3453 16.4427 23.3453H12.3824V24.0926C12.3824 24.445 12.4529 24.6847 12.7207 24.7975H18.2896V26.5739H12.0581C10.5919 26.5739 9.94336 25.8407 9.94336 24.7552ZM15.484 19.8772H13.2988C12.6925 19.8772 12.3824 19.9335 12.3824 20.5398V21.4985H15.484C15.9774 21.4985 16.1466 21.3152 16.1466 20.8499V20.5398C16.1466 20.0463 15.9774 19.8772 15.484 19.8772Z"
              fill="#111111"
            />
            <path
              d="M62.8401 6.78948C54.3398 7.86764 44.7052 10.1793 35.7665 13.2853C26.8277 16.3914 19.2074 20.0754 14.3531 23.6377C9.49879 27.2 7.74856 30.3925 9.43486 32.6086C11.1212 34.8247 16.1265 35.9101 23.5002 35.6588C30.8739 35.4074 40.1023 33.8366 49.4324 31.2449C58.7625 28.6532 67.5445 25.2211 74.1101 21.6004C80.6758 17.9798 84.5678 14.4228 85.0469 11.6052C85.526 8.78758 82.5588 6.90557 76.7089 6.31665L71.5523 8.84518C76.3884 9.33204 78.8414 10.8879 78.4454 13.2172C78.0493 15.5466 74.8317 18.4871 69.4039 21.4803C63.976 24.4735 56.716 27.3109 49.0028 29.4534C41.2895 31.596 33.6604 32.8945 27.5646 33.1024C21.4687 33.3102 17.3308 32.4128 15.9367 30.5808C14.5427 28.7487 15.9896 26.1095 20.0027 23.1645C24.0157 20.2196 30.3154 17.174 37.7051 14.6062C45.0948 12.0384 53.0597 10.1274 60.0869 9.23607L62.8401 6.78948Z"
              fill="#0066FF"
            />
            <path
              d="M18.5713 21.4421C18.5713 22.7109 17.8663 23.3455 16.4424 23.3455H14.7578C15.8941 22.5352 17.1708 21.7196 18.5713 20.907V21.4421Z"
              fill="#111111"
            />
            <path
              d="M19.167 20.2294V18.171H21.0844V15.1399H23.5093V18.171H26.4417V20.2294H23.5093V23.7258C23.5093 24.2756 23.7067 24.5153 24.2706 24.5153H26.4417V26.5736H23.6644C21.6342 26.5736 21.0844 25.6713 21.0844 23.8104V20.2294H19.167Z"
              fill="#111111"
            />
            <path
              d="M58.9463 26.5738V24.1489L64.4446 17.001V16.7473H59.1719V14.6748H67.2361V17.1138L61.7237 24.2758V24.5013H67.504V26.5738H58.9463Z"
              fill="#111111"
            />
            <path
              d="M87.3716 24.7552V20.7231C87.3716 18.848 88.006 18.0303 89.8811 18.0303H93.4339C95.3089 18.0303 95.9293 18.7493 95.9998 20.4834V21.4421C95.9998 22.7109 95.2948 23.3453 93.8709 23.3453H89.8106V24.0926C89.8106 24.445 89.8811 24.6847 90.149 24.7975H95.7178V26.5739H89.4863C88.0201 26.5739 87.3716 25.8407 87.3716 24.7552ZM92.9122 19.8772H90.727C90.1208 19.8772 89.8106 19.9335 89.8106 20.5398V21.4985H92.9122C93.4057 21.4985 93.5748 21.3152 93.5748 20.8499V20.5398C93.5748 20.0463 93.4057 19.8772 92.9122 19.8772Z"
              fill="#111111"
            />
            <path
              d="M86.4914 26.5739H84.0665V21.3434C84.0665 20.4834 83.6999 20.1027 82.7976 20.1027H80.5137V26.5739H78.0747V18.0303H83.6999C85.6314 18.0303 86.4914 19.0313 86.4914 20.9063V26.5739Z"
              fill="#111111"
            />
            <path
              d="M52.4904 26.5739H50.0655V21.3434C50.0655 20.4834 49.699 20.1027 48.7967 20.1027H46.5127V26.5739H44.0737V18.0303H49.699C51.6304 18.0303 52.4904 19.0313 52.4904 20.9063V26.5739Z"
              fill="#111111"
            />
            <path
              d="M38.9727 26.588H36.5337V20.4129C36.5337 18.7916 37.2245 18.0303 38.9163 18.0303H42.737V20.1027H39.734C39.1701 20.1027 38.9727 20.3424 38.9727 20.8922V26.588Z"
              fill="#111111"
            />
            <path
              d="M33.2398 18.0303H35.6647V23.4158C35.6647 25.5729 34.8047 26.6021 32.5913 26.6021H31.0828C28.3336 26.6021 27.248 25.9253 27.248 23.4158V18.0303H29.6871V22.0765C29.6871 23.8247 29.6166 24.5437 31.2802 24.5437H31.7031C33.3244 24.5437 33.2398 23.7401 33.2398 22.0765V18.0303Z"
              fill="#111111"
            />
            <path
              d="M9.53047 26.5738H6.89408C6.27375 25.0935 5.68163 23.6554 5.0613 22.1328H2.45311V26.5738H0V14.6748H5.35736C8.09244 14.6748 9.12162 15.704 9.12162 18.0302V18.9889C9.12162 20.441 8.55768 21.3715 7.42982 21.7804C8.12064 23.4299 8.81145 24.9243 9.53047 26.5738ZM2.45311 20.0463H5.0895C6.21736 20.0463 6.68261 19.6797 6.68261 18.7774V18.0302C6.68261 17.1279 6.21736 16.7614 5.0895 16.7614H2.45311V20.0463Z"
              fill="#111111"
            />
            <path
              d="M66.2307 12.0914L64.9922 8.12385L83.6964 3.02271L66.2307 12.0914Z"
              fill="#0066FF"
            />
            <path
              d="M74.6245 18.1011C75.763 18.392 76.4837 18.9973 76.8354 20.0044C76.1426 20.4358 75.4083 20.8673 74.6362 21.3022C74.5144 20.2514 73.9891 19.8775 72.6099 19.8774C72.4127 19.8774 72.2325 19.8847 72.0688 19.9009C73.0205 19.2928 73.8742 18.6915 74.6245 18.1011Z"
              fill="#111111"
            />
          </svg>
          <div className="self-stretch flex-grow-0 flex-shrink-0 h-12 relative">
            <p className="absolute left-[126px] top-0 text-[32px] font-semibold text-left text-[#111]">
              환영합니다
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col justify-start items-center self-stretch flex-grow gap-2 px-6">
          <form onSubmit={handleLogin} className="w-full">
            {/* Email Field */}
            <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2 mb-4">
              <p className="self-stretch flex-grow-0 flex-shrink-0 w-[342px] text-base font-semibold text-left">
                <span className="text-[#111111]">이메</span>
                <span className="text-[#111111]">일</span>
              </p>
              <div className="flex flex-col justify-between items-center self-stretch flex-grow-0 flex-shrink-0 h-14 overflow-hidden px-4 py-3.5 rounded-lg bg-white border border-[#CCCCCC]">
                <div className="flex justify-start items-center self-stretch flex-grow relative overflow-hidden gap-1.5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일을 입력해 주세요"
                    disabled={isLoading}
                    className="flex-grow w-[310px] text-base font-medium text-left bg-transparent outline-none placeholder-[#E6E6E6] disabled:opacity-50"
                  />
                </div>
              </div>
              {emailError && (
                <div className="flex justify-start items-center w-full p-4 bg-[#FFF2F2] rounded-lg">
                  <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-1">
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-grow-0 flex-shrink-0 w-4 h-4 relative"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M8 5.33333V8.66667M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
                        stroke="#FF0000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-[#f00]">
                      {emailError}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2 mb-4">
              <p className="self-stretch flex-grow-0 flex-shrink-0 w-[342px] text-base font-semibold text-left">
                <span className="text-[#111111]">비밀</span>
                <span className="text-[#111111]">번호</span>
              </p>
              <div className="flex flex-col justify-between items-center self-stretch flex-grow-0 flex-shrink-0 h-14 overflow-hidden px-4 py-3.5 rounded-lg bg-white border border-[#CCCCCC]">
                <div className="flex justify-start items-center self-stretch flex-grow relative overflow-hidden gap-1.5">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="8자 이상 입력해 주세요"
                    disabled={isLoading}
                    className="flex-grow w-[310px] text-base font-medium text-left bg-transparent outline-none placeholder-[#E6E6E6] disabled:opacity-50"
                  />
                </div>
              </div>
              {passwordError && (
                <div className="flex justify-start items-center w-full p-4 bg-[#FFF2F2] rounded-lg">
                  <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-1">
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-grow-0 flex-shrink-0 w-4 h-4 relative"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M8 5.33333V8.66667M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
                        stroke="#FF0000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-[#f00]">
                      {passwordError}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Auto Login & Links */}
            <div className="flex flex-row justify-between items-center self-stretch flex-grow overflow-hidden gap-2.5">
              <div className="flex flex-row justify-start items-center flex-grow-0 flex-shrink-0 relative ml-[-8px]">
                <button
                  type="button"
                  onClick={() => setRemember(!remember)}
                  disabled={isLoading}
                  className="flex justify-start items-center disabled:opacity-50"
                >
                  <svg
                    width={44}
                    height={44}
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-11 h-11 relative"
                    preserveAspectRatio="none"
                  >
                    <rect 
                      x="11.5" 
                      y="11.5" 
                      width={21} 
                      height={21} 
                      rx="3.5" 
                      fill={remember ? "#00D455" : "transparent"}
                      stroke={remember ? "#00D455" : "#808080"} 
                    />
                    {remember && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M20.1723 24.8999L26.9661 18L28 19.05L20.1723 27L16 22.7625L17.0339 21.7125L20.1723 24.8999Z"
                        fill="white"
                      />
                    )}
                  </svg>
                  <p className="flex-grow-0 flex-shrink-0 text-base font-medium text-left text-[#999999] ml-[-8px]">
                    자동 로그인
                  </p>
                </button>
              </div>
              <div className="flex flex-row justify-end items-center flex-grow w-full gap-2 text-sm">
                <button
                  type="button"
                  onClick={() => navigate('/search-id')}
                  disabled={isLoading}
                  className="flex justify-center items-center flex-grow-0 flex-shrink-0 h-11 relative gap-2.5 disabled:opacity-50 text-xs text-[#999999]"
                >
                  이메일찾기
                </button>
                <svg
                  width={2}
                  height={14}
                  viewBox="0 0 2 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-grow-0 flex-shrink-0"
                  preserveAspectRatio="none"
                >
                  <path d="M1 0V14" stroke="#E6E6E6" />
                </svg>
                <button
                  type="button"
                  onClick={() => navigate('/find')}
                  disabled={isLoading}
                  className="flex justify-center items-center flex-grow-0 flex-shrink-0 h-11 relative gap-2.5 disabled:opacity-50 text-xs text-[#999999]"
                >
                  비밀번호찾기
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2 mt-16">
              <button
                type="submit"
                disabled={isLoading}
                className="flex flex-col justify-between items-center self-stretch flex-grow-0 flex-shrink-0 h-14 overflow-hidden px-4 py-3.5 rounded-lg bg-[#06f] disabled:opacity-50"
              >
                <div className="flex justify-center items-center self-stretch flex-grow relative overflow-hidden gap-1.5">
                  <p className="flex-grow w-[310px] text-base font-semibold text-center text-white">
                    {isLoading ? '로그인 중...' : '로그인'}
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={handleSignup}
                disabled={isLoading}
                className="flex flex-col justify-between items-center self-stretch flex-grow-0 flex-shrink-0 h-14 overflow-hidden px-4 py-3.5 rounded-lg bg-white border border-[#CCCCCC] disabled:opacity-50"
              >
                <div className="flex justify-center items-center self-stretch flex-grow relative overflow-hidden gap-1.5">
                  <p className="flex-grow w-[310px] text-base font-semibold text-center text-[#111]">
                    회원가입
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={handleKakaoLogin}
                disabled={isLoading}
                className="flex flex-col justify-between items-center self-stretch flex-grow-0 flex-shrink-0 h-14 overflow-hidden px-4 py-3.5 rounded-lg bg-[#FFE500] disabled:opacity-50"
              >
                <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 h-7 relative overflow-hidden gap-1.5">
                  <img
                    src={kakaoIcon}
                    className="flex-grow-0 flex-shrink-0 w-8 h-[27px] object-none"
                    alt="카카오"
                  />
                  <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-center text-[#111]">
                    카카오 로그인
                  </p>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
