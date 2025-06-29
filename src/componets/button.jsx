// 버튼 이름, 처리 이벤트, 스타일 덮어쓰기, 기본타입 버튼, 클릭 가능 활성화 
export default function Button({ label, onClick, className = "", type = "button", disabled = false }) {
    return (
        <button
            type={type} // button, submit, reset
            onClick={onClick}
            disabled={disabled}
            className={`w-[370px] h-[48px] bg-[#000000] text-[#ffffff] text-[16px] font-medium ${className}`}
        >
            {label}
        </button>
    );
}
