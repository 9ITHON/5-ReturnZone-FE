export default function RegisterTag({ options = [], selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-[10px]">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          value={option}
          onClick={() => onChange(selected === option ? "" : option)}
          className={`px-[16px] py-[12px] rounded-full border font-medium cursor-pointer
            ${selected === option
              ? 'bg-[#0066FF26] border-[#0066FF]'
              : 'bg-[#FFFFFF] text-[#111111] border-[#B8B8B8]'}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}