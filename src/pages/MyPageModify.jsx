import MyPageUserHeader from "../components/MyPageUserHeader";
import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import Profile from '../assets/프로필수정.svg'
import addProfile from '../assets/프로필추가.svg'
import InputArrow from '../assets/인풋꺽쇠.svg'
import BottomArrow from '../assets/하단꺽쇠.svg'

import MypageInput from "../components/MyPageInput";
import RegisterLabel from "../components/register-label";
import Button from "../components/button";
import { GetMyPage } from "../utils/GetMyPage";
import MyPageBank from "../components/MyPageBank";
import useMyPageFormStore from "../stores/useMyPageFormStore";

export default function MyPageModify() {
    const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:8080';
    const [userInfo, setUserInfo] = useState(null);
    const fileInputRef = useRef(null);
    const {
        nickname, password, passwordConfirm,
        bankName, accountNumber, accountHolder,
        detailLocation, previewImage, selectedImageFile,
        setForm
    } = useMyPageFormStore();

    const [isBankModalOpen, setIsBankModalOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const selectedLocation = location.state?.selectedLocation || "";

    // 이미지 선택 창 열기
    const handleCameraClick = () => {
        fileInputRef.current.click();
    };
    // 미리 보기 이미지 설정
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            setForm({ selectedImageFile: file, previewImage: reader.result });
            reader.readAsDataURL(file);
        }
    };
    // 사용자 정보 호출
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                // 실제 호출
                const data = await GetMyPage(userId);
                // const data = await GetMyPageDummy(); // 테스트용 더미 데이터 호출
                setUserInfo(data);
                setForm({
                    nickname: data.nickname || '',
                    bankName: data.bankName || '',
                    accountNumber: data.accountNumber || '',
                    accountHolder: data.accountHolder || '',
                    previewImage: data.imageUrl || null
                });
            } catch (e) {
                console.error("유저 정보 로딩 실패:", e);
            }
        };

        fetchData();
    }, []);
    if (!userInfo) {
        return <div>유저 정보를 확인 중 입니다.</div>;
    }
    // 수정 요청
    const handleSubmit = async () => {
        if (password !== passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        try {
            const userId = localStorage.getItem("userId");

            const formData = new FormData();
            if (selectedImageFile) {
                formData.append("image", selectedImageFile);
            }

            formData.append("updateMyPageRequestDto", new Blob([JSON.stringify({
                nickname,
                password,
                location: selectedLocation,
                locationDetail: detailLocation,
                bankName,
                accountNumber,
                accountHolder,
            })], { type: "application/json" }));

            const response = await axios.put(`${apiBase}/api/v1/mypage`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-USER-ID": userId,
                }
            });

            alert("수정 완료되었습니다.");
            setUserInfo(response.data);
        } catch (e) {
            console.error("마이페이지 수정 실패:", e);
            alert("수정 중 오류가 발생했습니다.");
        }
    };
    // 위치창으로 이동
    const handleLocation = () => {
        navigate('/MyPageLocation', {
            state: {
                path: '/MyPageModify',
            }
        });
    };
    return (
        <div>
            <MyPageUserHeader label="개인정보 수정" />
            <div className="overflow-y-auto h-[660px] hide-scrollbar">
                <div className="flex items-center flex-col gap-[32px] py-[16px] px-[24px]">
                    {/* 숨겨진 input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        multiple
                        className="hidden"
                    />
                    {/* 프로필 */}
                    <div className="relative flex flex-col gap-[8px]">
                        <p className="text-[#111111] text-center text-[16px] font-semibold">프로필 사진</p>
                        <button
                            onClick={handleCameraClick}
                            className="w-[120px] h-[120px] rounded-full bg-[#F2F2F2] flex items-center justify-center flex-shrink-0 cursor-pointer"
                        >
                            <img src={previewImage || Profile} alt="프로필 이미지" className="object-cover w-full h-full rounded-full" />
                        </button>
                        <div className="absolute bottom-[10px] right-[10px]">
                            <img src={addProfile} alt="프로필 추가" />
                        </div>
                    </div>
                    {/* 입력필드 */}
                    <MypageInput label="닉네임" placeholder="닉네임을 입력해 주세요" value={nickname} onChange={e => setForm({ nickname: e.target.value })} />
                    <MypageInput type="password" label="비밀번호 변경" placeholder="8자 이상 입력해 주세요" value={password} onChange={e => setForm({ password: e.target.value })} />
                    <MypageInput type="password" label="비밀번호 변경 확인" placeholder="비밀번호 변경 확인" value={passwordConfirm} onChange={(e) => setForm({ passwordConfirm: e.target.value })} />
                    {/* 위치 수정 */}
                    <div className="w-full flex flex-col gap-[8px]">
                        <RegisterLabel label="동네변경" />
                        <button
                            onClick={handleLocation}
                            className={`w-full h-[48px] px-[16px] py-[14px] border border-[#B8B8B8] rounded-[8px] flex justify-between items-center font-normal cursor-pointer ${selectedLocation ? "text-[#111111]" : "text-[#B8B8B8]"}`}
                        >
                            {selectedLocation || "현재 위치(기본값)"}
                            <img src={InputArrow} alt=">" />
                        </button>
                        <input
                            type="text"
                            value={detailLocation}
                            onChange={e => setForm({ detailLocation: e.target.value })}
                            placeholder="상세 위치를 적어주세요 ex) 주민센터 앞"
                            className="w-full h-[48px] px-[16px] py-[14px] border border-[#B8B8B8] rounded-[8px]  placeholder-[#B8B8B8] font-normal"
                        />
                    </div>
                    {/* 계좌 정보 */}
                    <div className="flex flex-col gap-[8px] w-full">
                        <p className="text-[#111111] text-[16px] font-semibold">계좌 정보</p>
                        <div className="flex justify-between items-center gap-[4px]">
                            <div>
                                <button className="bg-[#F2F2F2] py-[12px] px-[16px] rounded-[56px] flex items-center gap-[4px] text-[14px] text-[#111111] font-medium"
                                    onClick={() => setIsBankModalOpen(true)}>
                                    {bankName || "은행선택"}
                                    <img src={BottomArrow} alt="" /> </button>
                            </div>
                            <input type="text" value={accountNumber} onChange={e => setForm({ accountNumber: e.target.value })}
                                className=" h-[56px] w-[226px] px-[16px] py-[14px] border border-[#B8B8B8] rounded-[8px]  placeholder-[#B8B8B8] font-normal" />
                        </div>
                        <div className="flex justify-between items-center gap-[4px] ">
                            <p className="text-[14px] text-[#111111] text-center w-[108px] font-medium">입금주명</p>
                            <input type="text" value={accountHolder} onChange={e => setForm({ accountHolder: e.target.value })}
                                className=" h-[56px] w-[226px] px-[16px] py-[14px] border border-[#B8B8B8] rounded-[8px]  placeholder-[#B8B8B8] font-normal" />
                        </div>
                    </div>
                </div>
            </div>
            <div className=" px-[24px] pt-[12px] pb-[38px] fixed bottom-0 ">
                <Button label="수정하기" onClick={handleSubmit} />
            </div>
            {isBankModalOpen && (
                <MyPageBank
                    onClose={() => setIsBankModalOpen(false)}
                    onSelect={(name) => {
                        setForm({ bankName: name });
                        setIsBankModalOpen(false);
                    }}
                />
            )}
        </div>
    )
}