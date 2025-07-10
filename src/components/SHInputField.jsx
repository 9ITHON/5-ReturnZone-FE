import ErrorIcon from "../assets/에러아이콘.svg"
// 사용자 입력을 받는 컴포넌트 입니다.
// 레이블, 입력타입, 입력값에 따른 이벤트, 입력필드 힌트 텍스트, 외부 스타일 
export default function SHInputField({ label, type, value, onChange, placeholder, labelclassName = "", className = "", error = "", success = "" }) {
    return (
        <div className="w-[342px] h-[113px] flex flex-col">
            <label className={`w-full h-[20px] text-[16px] font-semibold ${labelclassName}`}>
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`my-[8px] w-full h-[56px] px-[16px] py-[14px] font-normal border-[#B8B8B8] border-[1px] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-black focus:shadow-md placeholder-[#B8B8B8] ${className}`}
                required
            />
            {/* 오류메시지 출력 영역 */}
            {error && (
                <span className="text-[#D32F2F] text-[14px] font-normal flex items-center">
                    <img src={ErrorIcon} alt="⚠" className="mr-[4px]" />
                    {error}
                </span>
            )}
            {!error && success && (
                <span className="text-[#2E7D32] text-[14px] font-normal">{success}</span>
            )}
        </div>

    );
}