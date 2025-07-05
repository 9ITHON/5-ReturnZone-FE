import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import InputField from "../components/input-field";
import Button from "../components/button";
import RegisterHeader from "../components/register-header";
import RegisterLabel from "../components/register-label";
import RegisterTag from "../components/register-tag";
import { UseKeyboardOpen } from "../utils/useKeyboardOpen";

import CameraIcon from '../assets/camera.svg'
import WhiteX from '../assets/흰색x.svg'
import InputArrow from '../assets/인풋꺽쇠.svg'
import Plus from '../assets/plus.svg'
import Calendar from '../assets/달력아이콘.svg'
import Time from '../assets/time.svg'


export default function RegisterPage() {
    const [selectedTag, setSelectedTag] = useState(""); // 분실, 찾았어요 처리
    const [selectedCategory, setSelectedCategory] = useState(""); // 카테고리
    const [title, setTitle] = useState(""); // 제목
    const [images, setImages] = useState([]); // 이미지 파일들 저장하는 상태 배열
    const fileInputRef = useRef(null); // 파일 선택 창 접근
    const [selectedLocation, setSelectedLocation] = useState(""); // 사용자 위치 저장
    const [detailLocation, setDetailLocation] = useState(""); // 상세 주소
    const [questions, setQuestions] = useState(["", ""]);  // 상세 특징(최소 2개)
    
    const navigate = useNavigate("");
    const location = useLocation();
    const isKeyboardOpen = UseKeyboardOpen();

    // 분실/획득 시간 라벨 텍스트 동적 처리
    const locationLabel = selectedTag === "주인을 찾아요" ? "획득 장소" : "분실품 장소";
    const dateLabel = selectedTag === "주인을 찾아요" ? "획득 날짜" : "분실 날짜";
    const timeLabel = selectedTag === "주인을 찾아요" ? "획득 시간" : "분실 시간";
    const detailLabel = selectedTag === "주인을 찾아요" ? "획득한 분실품 특징 (최대 5개)" : "분실품 특징 (최대 5개)";



    // 이미지 등록 버튼 (최대 5개)
    const handleCameraClick = (e) => {
        if (images.length >= 5) {
            alert("최대 선택 가능 이미지는 5장 입니다.")
            return;
        };
        fileInputRef.current.click();
    }
    // 추가 이미지 선택 가능
    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const remainingSlots = 5 - images.length;
        const filesToAdd = selectedFiles.slice(0, remainingSlots);
        setImages((prev) => [...prev, ...filesToAdd]);
        e.target.value = ""; // 같은 파일 일 경우 초기화
    };
    // x 버튼 클릭 시 호출
    const handleDelete = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };
    // 위치창으로 이동
    const handleLocation = () => {
        navigate('/RegisterLocation');
    }
    // RegisterLocation에서 온 주소 수신
    useEffect(() => {
        if (location.state?.address) {
            setSelectedLocation(location.state.address);
        }
    }, [location]);
    // 상세 특징 업데이트
    const handleChange = (index, value) => {
        setQuestions((prev) => {
            const updated = [...prev];
            updated[index] = value;
            return updated;
        });
    };
    // 최대 5개 까지 빈 질문 추가 가능
    const handleAddQuestion = () => {
        if (questions.length >= 5) return;
        setQuestions((prev) => [...prev, ""]);
    };


    return (
        <div>
            <div>
                <RegisterHeader title="분실물 등록" />
            </div>
            <div className="overflow-y-auto h-[660px] hide-scrollbar">
                {/* 숨겨진 input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    multiple
                    className="hidden"
                />
                {/* 이미지 */}
                <div className="pl-[24px] py-[12px] h-[100px] overflow-x-auto flex gap-2 overflow-y-hidden hide-scrollbar">
                    {/* 이미지 업로드 버튼 */}
                    <button
                        onClick={handleCameraClick}
                        className="w-[72px] h-[72px] border-[1px] border-[#B8B8B8] rounded-[8px] bg-white flex flex-col items-center justify-center flex-shrink-0 cursor-pointer"
                    >
                        <img src={CameraIcon} alt="이미지 등록" className="w-6 h-6 mb-1" />
                        <div className="text-[16px] ">
                            <span className="text-[#0066FF] font-medium">{images.length}</span>
                            <span className="text-[#B8B8B8] font-medium">/5</span>
                        </div>
                    </button>
                    {/* 이미지 미리보기 카드 */}
                    {images.map((file, index) => (
                        <div
                            key={index}
                            className="relative w-[72px] h-[72px] bg-[#F5F5F5] rounded-[8px] shrink-0 "
                        >
                            <img
                                src={URL.createObjectURL(file)}
                                alt={`preview-${index}`}
                                className="w-full h-full object-cover rounded-[8px] "
                            />
                            {/* 삭제 버튼 */}
                            <button
                                onClick={() => handleDelete(index)}
                                className="absolute top-[-6px] right-[-6px] bg-[#888] w-[20px] h-[20px] rounded-full text-white text-xs flex items-center justify-center z-10 cursor-pointer"
                            >
                                <img src={WhiteX} alt="x" />
                            </button>
                            {/* 대표사진 뱃지 */}
                            {index === 0 && (
                                <div className="absolute bottom-0 w-full h-[22px] bg-[#11111199] text-white text-[13px] text-center font-medium rounded-b-[8px] py-[2px]">
                                    대표 사진
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {/* 정보 입력 창 */}
                <div className="pt-[16px] px-[24px] flex flex-col gap-[32px]">
                    {/* 등록 유형 */}
                    <div>
                        <RegisterLabel label="등록 유형" />
                        <RegisterTag options={['분실했어요', '주인을 찾아요']} selected={selectedTag} onChange={setSelectedTag} />
                    </div>
                    {/* 제목 함수 구현 필요*/}
                    <div className="h-[78px]">
                        <InputField label="제목" placeholder="글 제목" type="text" value={title} ></InputField>
                    </div>
                    {/* 자세한 내용 */}
                    <div>
                        <RegisterLabel label="자세한 내용" />
                        <p className="text-[14px] text-[#808080] my-[8px]">
                            게시글 내용을 작성 해 주세요.<br />
                            (거래 금지 물품은 게시가 제한될 수 있어요.)
                        </p>
                        <textarea
                            placeholder="글 본문"
                            className="w-full h-[134px] p-[12px] border-[1px] border-[#B8B8B8] rounded-[8px] text-[16px] resize-none focus:border-[#111111]"
                        />
                    </div>
                    {/* 카테고리 */}
                    <div>
                        <RegisterLabel label="카테고리" />
                        <RegisterTag options={['전자기기', '지갑', '가방', '소지품', '의류', '서류', '애완동물', '기타']} selected={selectedCategory} onChange={setSelectedCategory} />
                    </div>
                    {/* 물품명 */}
                    <div className="h-[78px]">
                        <InputField label="물품명" placeholder="ex) 아이폰 16" />
                    </div>
                    {/* 분실품 장소 */}
                    <div>
                        <RegisterLabel label={locationLabel} />
                        <button
                            onClick={handleLocation}
                            className="w-full h-[56px] my-[8px] px-[16px] py-[14px] border border-[#B8B8B8] rounded-[8px] flex justify-between items-center font-normal text-[#B8B8B8] cursor-pointer"
                        >
                            {selectedLocation || "위치를 지정해 주세요"}
                            <img src={InputArrow} alt=">" />
                        </button>
                        <input
                            type="text"
                            value={detailLocation}
                            onChange={(e) => setDetailLocation(e.target.value)}
                            placeholder="상세 위치를 적어주세요 ex) 주민센터 앞"
                            className="w-full h-[56px] my-[8px] px-[16px] py-[14px] border border-[#B8B8B8] rounded-[8px]  placeholder-[#B8B8B8] font-normal"
                        />
                    </div>
                    {/* 분실날짜 */}
                    <div>
                        <RegisterLabel label={dateLabel} />
                        <button
                            // onClick={handleLocation} 함수 변경 필요
                            className="w-full h-[56px] px-[16px] py-[14px] border border-[#B8B8B8] rounded-[8px] flex justify-between items-center font-normal text-[#B8B8B8] cursor-pointer"
                        >
                            <div className="flex items-center gap-[8px]">
                                <img src={Calendar} alt="" />{selectedLocation || "날짜 선택"}
                            </div>
                            <img src={InputArrow} alt=">" />
                        </button>
                    </div>
                    {/* 분실 시간 */}
                    <div>
                        <RegisterLabel label={timeLabel} />
                        <button
                            // onClick={handleLocation} 함수 변경 필요
                            className="w-full h-[56px] px-[16px] py-[14px] border border-[#B8B8B8] rounded-[8px] flex justify-between items-center font-normal text-[#B8B8B8] cursor-pointer"
                        >
                            <div className="flex items-center gap-[8px]">
                                <img src={Time} alt="" />
                                {selectedLocation || (selectedTag === "주인을 찾아요" ? "획득 시간 선택" : "시간 선택")}
                            </div>
                            <img src={InputArrow} alt=">" />
                        </button>
                    </div>
                    {/* 분실품 특징 */}
                    <div>
                        <RegisterLabel label={detailLabel} />
                        <p className="text-[14px] text-[#808080] my-[8px]">
                            주인 확인을 위해, 분실물의 특징 중 본인만 알 수 있는 내용을 질문처럼 적어주세요.
                            <br />
                            입력한 내용은 습득자에게 퀴즈 형식으로 제공됩니다.
                        </p>
                        {questions.map((q, index) => (
                            <input
                                key={index}
                                type="text"
                                value={q}
                                onChange={(e) => handleChange(index, e.target.value)}
                                placeholder={`질문 ${index + 1}`}
                                className="w-full h-[56px] my-[4px] px-[16px] py-[14px] border border-[#B8B8B8] rounded-[8px]  placeholder-[#B8B8B8] font-normal"
                            />
                        ))}
                        {questions.length < 5 && (
                            <button
                                type="button"
                                onClick={handleAddQuestion}
                                className="flex items-center justify-center gap-[4px] w-[106px] h-[38px] my-[4px] bg-[#F2F2F2] px-[16px] py-[10px] text-[14px] text-[#111111] rounded-full cursor-pointer"
                            >
                                <img src={Plus} alt="+" />
                                질문 추가
                            </button>
                        )}
                    </div>
                    {/* 분실했어요 조건 렌더링 */}
                    {selectedTag === "분실했어요" && (
                        <div>
                            {/* 현상금 입력 */}
                            <div className="mb-[32px]">
                                <RegisterLabel label="현상금" />
                                <p className=" font-medium text-[#808080] text-[14px] mb-[8px]">
                                    현상금은 등록 시 예치되며, 반환 실패 시 환불 요청으로 돌려받을 수 있습니다.
                                    금액은 입력값과 일치해야 하며, 입금자명은 계정명과 동일해야 합니다.
                                </p>
                                <div className="flex items-center border border-[#D0D0D0] rounded-[8px] px-[16px] py-[14px]">
                                    <input type="number" placeholder="금액을 입력해주세요"
                                        className=" flex-1 outline-none placeholder-[#B8B8B8] font-normal hide-number-spin" />
                                    <span className="text-[#888] text-[14px]" >(원)</span>
                                </div>
                            </div>

                            {/* 예치 계좌 정보 */}
                            <div>
                                <RegisterLabel label="플랫폼 예치 계좌" />
                                <p className=" font-medium text-[#808080] text-[14px]">예금주명 : 리턴존</p>
                                <div className="flex items-center gap-[8px]">
                                    <span>우리은행 1111-22222-23323</span>
                                    <button className="flex items-center justify-center gap-[4px] my-[4px] bg-[#F2F2F2] px-[16px] py-[10px] text-[14px] text-[#111111] rounded-full cursor-pointer"
                                        onClick={() => {
                                            navigator.clipboard.writeText("1111-22222-23323");
                                            alert("계좌번호가 복사되었습니다.");
                                        }}
                                    >
                                        계좌복사
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className={`px-[24px] py-[12px] fixed bottom-[30px] md:bottom-[110px] z-50 ${isKeyboardOpen ? '!bottom-[10px]' : ''}`}>
                <Button label="등록 하기"
                // onClick={handleRegister}
                />
            </div>
        </div>
    )
}