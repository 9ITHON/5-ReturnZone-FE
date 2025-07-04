import { useRef, useState } from "react";
import axios from "axios";

import InputField from "../components/input-field";
import Button from "../components/button";
import RegisterHeader from "../components/register-header";
import RegisterLabel from "../components/register-label";
import RegisterTag from "../components/register-tag";

import CameraIcon from '../assets/camera.svg'
import WhiteX from '../assets/흰색x.svg'

export default function RegisterPage() {
    const [selectedTag, setSelectedTag] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(""); // 선택 태그
    const [title, setTitle] = useState(""); //제목
    const [images, setImages] = useState([]); // 이미지 파일들 저장하는 상태 배열
    const fileInputRef = useRef(null); // 파일 선택 창 접근
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



    return (
        <div>
            <div>
                <RegisterHeader title="분실물 등록" />
            </div>
            <div className="overflow-y-auto h-[624px]">
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
                <div className="pl-[24px] py-[12px] h-[100px] overflow-x-auto flex gap-2 overflow-y-hidden">
                    {/* 이미지 업로드 버튼 */}
                    <button
                        onClick={handleCameraClick}
                        className="w-[72px] h-[72px] border-[1px] border-[#B8B8B8] rounded-[8px] bg-white flex flex-col items-center justify-center flex-shrink-0"
                    >
                        <img src={CameraIcon} alt="카메라" className="w-6 h-6 mb-1" />
                        <div className="text-[16px]">
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
                                className="w-full h-full object-cover rounded-[8px]"
                            />
                            {/* 삭제 버튼 */}
                            <button
                                onClick={() => handleDelete(index)}
                                className="absolute top-[-6px] right-[-6px] bg-[#888] w-[20px] h-[20px] rounded-full text-white text-xs flex items-center justify-center z-10"
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
                <div className="pt-[16px] pb-[24px] px-[24px] flex flex-col gap-[32px]">
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
                            className="w-full h-[134px] p-[12px] border-[1px] border-[#B8B8B8] rounded-[8px] text-[14px] resize-none focus:outline-none focus:border-[#0066FF]"
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

                </div>
            </div>
            <div className="fixed bottom-[67px] flex justify-center h-[110px] py-[12px] px-[24px]">
                <Button label="등록 하기"
                // onClick={handleRegister} 
                />
            </div>
        </div>
    )
}