import { useState, useEffect, useRef, forwardRef } from "react";
import Button from "./button";

const AM_TIMES = [
    "12:00", "1:00", "2:00", "3:00", "4:00", "5:00",
    "6:00", "7:00", "8:00", "9:00", "10:00", "11:00"
];
const PM_TIMES = [...AM_TIMES];

const timeTo24Hour = (period, time) => {
    let hour = parseInt(time);
    if (period === "오후" && hour !== 12) hour += 12;
    if (period === "오전" && hour === 12) hour = 0;
    return hour;
};

const TimePickerModal = forwardRef(({ onClose, onSelect }, ref) => {
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [period, setPeriod] = useState("오전");

    // 외부 클릭 감지 로직
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref, onClose]);

    const handleTimeClick = (time) => {
        const key = `${period} ${time}`;
        let updated = [...selectedTimes];

        if (updated.length >= 2) {
            updated = [key];
        } else if (updated.includes(key)) {
            updated = updated.filter((t) => t !== key);
        } else {
            updated.push(key);
        }

        setSelectedTimes(updated);
    };

    const handleSelect = () => {
        if (selectedTimes.length > 0) {
            const sorted = selectedTimes
                .map((t) => ({ key: t, val: timeTo24Hour(...t.split(" ")) }))
                .sort((a, b) => a.val - b.val)
                .map((t) => t.key);
            onSelect(sorted);
            onClose();
        }
    };

    const isInRange = (time) => {
        if (selectedTimes.length < 2) return false;
        const times24 = selectedTimes.map((t) => timeTo24Hour(...t.split(" ")));
        const min = Math.min(...times24);
        const max = Math.max(...times24);
        const current = timeTo24Hour(period, time);
        return current > min && current < max;
    };

    const isSelected = (time) => {
        const key = `${period} ${time}`;
        return selectedTimes.includes(key);
    };

    const renderTimes = (times) => {
        return times.map((time) => {
            const selected = isSelected(time);
            const inRange = isInRange(time);

            return (
                <button
                    key={`${period} ${time}`}
                    onClick={() => handleTimeClick(time)}
                    className={`h-[44px] w-[93px] rounded-full text-sm border-none ${selected ? "bg-blue-600 text-white z-10"
                        : inRange ? "bg-blue-100 text-black"
                            : "bg-white text-black border z-0"}`}
                >
                    {time}
                </button>
            );
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-end bg-[#11111180]">
            <div ref={ref} className="bg-white rounded-t-[20px] w-full max-w-md px-6 pt-5 pb-8">
                <div className="w-full h-[68px] flex flex-col justify-center">
                    <h2 className="text-center font-semibold text-[16px]">시간선택</h2>
                    <p className="text-center text-[16px] text-[#808080]">(중복 선택 가능)</p>
                </div>
                <div className="flex justify-center mb-6">
                    {["오전", "오후"].map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={`w-[171px] h-[46px] text-[16px] ${period === p ? "border-b-2 border-black font-semibold" : "text-gray-400"}`}
                        >
                            {p}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-3 gap-1 justify-items-center font-semibold text-[16px]">
                    {renderTimes(period === "오전" ? AM_TIMES : PM_TIMES)}
                </div>

                <div className="mt-6 flex justify-center">
                    <Button label="선택 완료" onClick={handleSelect} />
                </div>
            </div>
        </div>
    );
});

export default TimePickerModal;
