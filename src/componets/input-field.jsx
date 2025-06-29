export default function InputField({ label, type, value, onChange, placeholder, className = "" }) {
    return (
        <div className="w-[370px] h-[76px] flex flex-col gap-[8px]">
            <label className="w-full h-[20px] text-[14px] font-medium">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full h-[48px] font-normal border-[#AFB1B6] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-black focus:shadow-md placeholder-[#AFB1B6] ${className}`}
                required
            />
        </div>

    );
}