import { useState } from "react";
export default function UserMessage({ message }) {
    const [showMessage, setShowMessage] = useState(true);

    const handleClose = () => {
        setShowMessage(false);
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-[#11111180]'>
            <div className="bg-[#e4e4e4] rounded-[14px] h-[148px] w-[270px] text-center">
                <div className='px-[16px] py-[20px] h-[104px]'>
                    <p className='text-[18px] text-[#111111] font-bold'>알림</p>
                    <p dangerouslySetInnerHTML={{ __html: message }} className='text-[14px] text-[#111111] font-normal'></p>
                </div>
                <div className='flex'>
                    <button className='w-full font-medium text-[16px] h-[44px] rounded-bl-[14px] border border-[#808080] text-[#0066FF]' onClick={handleClose}>확인했습니다!</button>
                </div>
            </div>
        </div>
    );
}
