// 레이블, 입력타입, 입력값에 따른 이벤트, 입력필드 힌트 텍스트, 외부 스타일 
export default function InputField({ label, type, value, onChange, placeholder, className = "" }) {
    return (
        <div className="w-[370px] h-[76px] mb-[8px] flex flex-col gap-[8px]">
            <label className="w-full h-[20px] text-[14px] font-medium">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full h-[48px] p-[12px] font-normal border-[#AFB1B6] border-[1px] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-black focus:shadow-md placeholder-[#AFB1B6] ${className}`}
                required
            />
        </div>

    );
}