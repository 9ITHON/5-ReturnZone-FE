import { useState } from "react";
import { enUS } from "date-fns/locale";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import Button from "./button";

export default function CalendarModal({ onClose, onSelect }) {
    const [selected, setSelected] = useState();

    const handleSelect = () => {
        if (selected) {
            onSelect(selected); // 선택된 날짜 전달
            onClose();           // 모달 닫기
        }
    };


    return (
        <div className="fixed inset-0 z-50 flex justify-center items-end bg-[#11111180] ">
            <div className="bg-white rounded-t-[20px] w-full max-w-md px-[24px] pt-[20px] pb-[32px]">
                <h2 className="text-[16px] text-[#111111] font-semibold text-center py-[11px] px-[24px]">날짜 선택</h2>
                <DayPicker
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
                    locale={enUS}
                    formatters={{
                        weekdayName: (date) => format(date, "EEE", { locale: enUS }) // 'EEE' = 'Mon', 'Tue' 왜 안돼...
                    }}
                    className="ml-[10px]"
                />
                <div className="py-[12px] flex justify-center">
                    <Button label="선택 완료" onClick={handleSelect} />
                </div>
            </div>
        </div>
    );
}
