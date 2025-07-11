import ErrorIcon from "../assets/에러아이콘.svg"
// 사용자 입력을 받는 컴포넌트 입니다.
// 레이블, 입력타입, 입력값에 따른 이벤트, 입력필드 힌트 텍스트, 외부 스타일 
export default function MypageInput({ label, type, value, onChange, placeholder, labelclassName = "", className = "" }) {
    return (
        <div className="w-[342px] flex flex-col gap-[8px]">
            <label className={`w-full h-[20px] text-[16px] font-semibold ${labelclassName}`}>
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full h-[48px] px-[16px] py-[14px] font-normal border-[#B8B8B8] border-[1px] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-black focus:shadow-md placeholder-[#B8B8B8] ${className}`}
                required
            />
        </div>

    );
}