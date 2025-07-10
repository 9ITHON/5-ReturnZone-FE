import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";

import SHInputField from "../components/SHInputField";
import Button from "../components/button";
import RegisterHeader from "../components/register-header";
import RegisterLabel from "../components/register-label";
import RegisterTag from "../components/register-tag";
import { UseKeyboardOpen } from "../utils/useKeyboardOpen";
import CalendarModal from "../components/calendar-modal";
import TimePickerModal from "../components/time-picker-modal";

import CameraIcon from '../assets/camera.svg'
import WhiteX from '../assets/흰색x.svg'
import InputArrow from '../assets/인풋꺽쇠.svg'
import Plus from '../assets/plus.svg'
import Calendar from '../assets/달력아이콘.svg'
import Time from '../assets/time.svg'
import XButton from '../assets/x버튼.svg'


export default function ModifyPage() {
    const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:8080';
    const [selectedTag, setSelectedTag] = useState(""); // 분실, 찾았어요 처리
    const [selectedCategory, setSelectedCategory] = useState(""); // 카테고리
    const [title, setTitle] = useState(""); // 제목
    const [images, setImages] = useState([]); // 이미지 파일들 저장하는 상태 배열
    const fileInputRef = useRef(null); // 파일 선택 창 접근
    const [selectedLocation, setSelectedLocation] = useState(""); // 사용자 위치 저장
    const [detailLocation, setDetailLocation] = useState(""); // 상세 주소
    const [questions, setQuestions] = useState(["", ""]);  // 상세 특징(최소 2개)
    const [isCalendarOpen, setIsCalendarOpen] = useState(false); // 캘린더 열림 상태
    const [selectedDate, setSelectedDate] = useState(null) // 날짜 저장
    const [isTimePickerOpen, setIsTimePickerOpen] = useState(false); // 시간 모달 열림 상태
    const [selectedTimes, setSelectedTimes] = useState([]); // 시간 저장
    const [description, setDescription] = useState(""); // 글 본문
    const [itemName, setItemName] = useState(""); // 물품명
    const [reward, setReward] = useState(""); // 현상금
    const calendarRef = useRef(null); // 캘린더 영역 참조
    const timePickerRef = useRef(null); // 시간 영역 참조

    const { lostPostId } = useParams(); // URL로 정보 받기
    const navigate = useNavigate("");
    const location = useLocation();
    const isKeyboardOpen = UseKeyboardOpen();

    // 분실/획득 시간 라벨 텍스트 동적 처리
    const locationLabel = selectedTag === "주인을 찾아요" ? "획득 장소" : "분실품 장소";
    const dateLabel = selectedTag === "주인을 찾아요" ? "획득 날짜" : "분실 날짜";
    const timeLabel = selectedTag === "주인을 찾아요" ? "획득 시간" : "분실 시간";
    const detailLabel = selectedTag === "주인을 찾아요" ? "획득한 분실품 특징 (최대 5개)" : "분실품 특징 (최대 5개)";
    // 기존 데이터 불러오기
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`${apiBase}/api/v1/lostPosts/${lostPostId}`);
                const data = res.data;

                setSelectedTag(data.registrationType === "LOST" ? "분실했어요" : "주인을 찾아요");
                setTitle(data.title);
                setSelectedCategory(data.category);
                setItemName(data.itemName);
                setSelectedLocation(data.lostLocationDong);
                setDetailLocation(data.detailedLocation);
                setReward(data.reward.toString());
                setDescription(data.description);
                setQuestions([
                    data.feature1, data.feature2, data.feature3, data.feature4, data.feature5
                ].filter(Boolean));

                setSelectedDate(new Date(data.lostDateTimeStart));
                setSelectedTimes([
                    new Date(data.lostDateTimeStart).toTimeString().slice(0, 5),
                    new Date(data.lostDateTimeEnd).toTimeString().slice(0, 5),
                ]);

                setImages([data.imageUrls || []]); // 이미지는 URL이므로 미리보기 필요시 별도 처리
            } catch (err) {
                console.error("불러오기 실패", err);
                alert("게시글 정보를 불러오지 못했습니다.");
            }
        };
        fetchPost();
    }, [lostPostId]);

    // RegisterLocation에서 온 주소 수신
    useEffect(() => {
        if (location.state?.address) {
            console.log("주소 수신:", location.state);
            setSelectedLocation(location.state.address);
        }
    }, [location]);
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
    // 질문 삭제
    const handleDeleteQuestion = (index) => {
        setQuestions(prev => prev.filter((_, i) => i !== index));
    };
    // 숫자 콤마 추가
    const formatWithComma = (value) => {
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    // 쉼표 제거 → 숫자만 추출
    const unformatComma = (value) => {
        return value.replace(/,/g, "");
    };
    // 외부클릭으로 모달 닫기
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isCalendarOpen && calendarRef.current && !calendarRef.current.contains(e.target)) {
                setIsCalendarOpen(false);
            }
            if (isTimePickerOpen && timePickerRef.current && !timePickerRef.current.contains(e.target)) {
                setIsTimePickerOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isCalendarOpen, isTimePickerOpen]);
    // 수정하기
    const handleUpdate = async () => {
        try {
            const userId = localStorage.getItem("userId");
            const { lat, lng } = location.state || {};

            const date = selectedDate?.toISOString().split("T")[0];
            const startTime = selectedTimes[0] || "00:00";
            const endTime = selectedTimes[1] || "00:00";
            const lostDateTimeStart = new Date(`${date}T${startTime}`);
            const lostDateTimeEnd = new Date(`${date}T${endTime}`);

            const formData = new FormData();
            formData.append("requestDto", new Blob([JSON.stringify({
                registrationType: selectedTag === "분실했어요" ? "LOST" : "FOUND",
                title,
                nickname: "유저 1",
                timeAgo: "방금 전",
                lostLocationDong: selectedLocation,
                detailedLocation: detailLocation,
                latitude: lat,
                longitude: lng,
                reward: Number(reward),
                instantSettlement: true,
                feature1: questions[0] || "",
                feature2: questions[1] || "",
                feature3: questions[2] || "",
                feature4: questions[3] || "",
                feature5: questions[4] || "",
                lostDateTimeStart: lostDateTimeStart.toISOString(),
                lostDateTimeEnd: lostDateTimeEnd.toISOString()
            })], { type: "application/json" }));

            // 이미지 파일 추가
            images.forEach((img) => formData.append("images", img));

            const response = await axios.put(`${apiBase}/api/v1/lostPosts/${lostPostId}`, formData, {
                headers: {
                    'X-USER-ID': userId,
                    'Content-Type': 'multipart/form-data'
                }
            });

            alert("수정이 완료되었습니다.");
            navigate(`/lost/${lostPostId}`);
        } catch (error) {
            console.error("수정 실패", error);
            alert("수정 중 오류가 발생했습니다.");
        }
    };
    // 외부클릭으로 모달 닫기
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isCalendarOpen && calendarRef.current && !calendarRef.current.contains(e.target)) {
                setIsCalendarOpen(false);
            }
            if (isTimePickerOpen && timePickerRef.current && !timePickerRef.current.contains(e.target)) {
                setIsTimePickerOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isCalendarOpen, isTimePickerOpen]);


    return (
        <div>
            <div>
                <RegisterHeader title="게시글 수정하기" />
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
                    {/* 제목 함수*/}
                    <div className="h-[78px]">
                        <SHInputField label="제목" placeholder="글 제목" type="text" value={title} onChange={e => setTitle(e.target.value)} ></SHInputField>
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
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full h-[134px] p-[12px] border-[1px] border-[#B8B8B8] rounded-[8px] text-[16px] resize-none focus:border-[#111111] focus:outline-none"
                        />
                    </div>
                    {/* 카테고리 */}
                    <div>
                        <RegisterLabel label="카테고리" />
                        <RegisterTag options={['전자기기', '지갑', '가방', '소지품', '의류', '서류', '애완동물', '기타']} selected={selectedCategory} onChange={setSelectedCategory} />
                    </div>
                    {/* 물품명 */}
                    <div className="h-[78px]">
                        <SHInputField label="물품명" placeholder="ex) 아이폰 16" type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                    </div>
                    {/* 분실품 위치 */}
                    <div>
                        <RegisterLabel label={locationLabel} path="/lost/:lostPostId/edit" />
                        <button
                            onClick={handleLocation}
                            className={`w-full h-[56px] my-[8px] px-[16px] py-[14px] border border-[#B8B8B8] rounded-[8px] flex justify-between items-center font-normal cursor-pointer ${selectedLocation ? "text-[#111111]" : "text-[#B8B8B8]"}`}
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
                            onClick={() => setIsCalendarOpen(true)}
                            className={`w-full h-[56px] px-[16px] py-[14px] border border-[#B8B8B8] rounded-[8px] flex justify-between items-center font-normal cursor-pointer ${selectedDate ? "text-[#111111]" : "text-[#B8B8B8]"}`}
                        >
                            <div className="flex items-center gap-[8px]">
                                <img src={Calendar} alt="" />
                                {selectedDate ? selectedDate.toLocaleDateString() : "날짜 선택"}
                            </div>
                            <img src={InputArrow} alt=">" />
                        </button>
                    </div>
                    {/* 분실 시간 */}
                    <div>
                        <RegisterLabel label={timeLabel} />
                        <button
                            onClick={() => setIsTimePickerOpen(true)}
                            className={`w-full h-[56px] px-[16px] py-[14px] border border-[#B8B8B8] rounded-[8px] flex justify-between items-center font-normal cursor-pointer ${selectedTimes.length > 0 ? "text-[#111111]" : "text-[#B8B8B8]"}`}
                        >
                            <div className="flex items-center gap-[8px]">
                                <img src={Time} alt="" />
                                {selectedTimes.length > 0
                                    ? selectedTimes.join(" ~ ")
                                    : selectedTag === "주인을 찾아요"
                                        ? "획득 시간 선택"
                                        : "시간 선택"}
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
                        <div className="flex gap-[10px]">
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
                            {questions.length > 2 && (
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(questions.length - 1)}
                                    className="flex items-center justify-center gap-[4px] w-[106px] h-[38px] my-[4px] bg-[#F2F2F2] px-[16px] py-[10px] text-[14px] text-[#111111] rounded-full cursor-pointer"
                                >
                                    <img src={XButton} alt="x" className="w-[18px] h-[18px]" /> 질문 삭제
                                </button>
                            )}
                        </div>
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
                                    <input
                                        type="text" placeholder="금액을 입력해주세요" value={formatWithComma(reward)}
                                        onChange={(e) => {
                                            const raw = unformatComma(e.target.value);
                                            if (!/^\d*$/.test(raw)) return; // 숫자만 허용
                                            setReward(raw);
                                        }}
                                        className="flex-1 outline-none placeholder-[#B8B8B8] font-normal hide-number-spin"
                                    />
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
                <Button label="저장하기" onClick={handleUpdate} />
            </div>
            {/* 캘린더 모달 조건부 렌더링 */}
            {isCalendarOpen && (
                <CalendarModal
                    ref={calendarRef}
                    onClose={() => setIsCalendarOpen(false)}
                    onSelect={(date) => setSelectedDate(date)}
                />
            )}
            {/* 시간선택 모달 조건부 렌더링 */}
            {isTimePickerOpen && (
                <TimePickerModal ref={timePickerRef}
                    onClose={() => setIsTimePickerOpen(false)}
                    onSelect={(times) => setSelectedTimes(times)}
                />
            )}
        </div>
    )
}
