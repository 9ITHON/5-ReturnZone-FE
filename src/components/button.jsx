// 버튼 컴포넌트 입니다.
// 버튼 이름, 처리 이벤트, 스타일 덮어쓰기, 기본타입 버튼, 클릭 가능 활성화 
export default function Button({ label, onClick, className = "", type = "button", disabled = false }) {
    return (
        <button
            type={type} // button, submit, reset
            onClick={onClick}
            disabled={disabled}
            className={`w-[354px] h-[56px] bg-[#0066FF] text-[#ffffff] text-[16px] font-semibold cursor-pointer rounded-[8px] ${className}`}
        >
            {label}
        </button>
    );
}
