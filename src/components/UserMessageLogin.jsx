import { useNavigate } from 'react-router-dom';

export default function UserMessageLogin({ title, message, cancelLabel = "취소", confirmLabel = "로그인 하기", cancelPath, path }) {
    const navigate = useNavigate();

    const handleConfirm = () => {
        navigate(path);
    };
    const handleCancel = () => {
        if (cancelPath === -1) {
            navigate(-1); //숫자일 경우 뒤로가기
        } else {
            navigate(cancelPath);
        }
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-[#11111180]'>
            <div className="bg-[#e4e4e4] rounded-[14px] h-[148px] w-[270px] text-center">
                <div className='px-[16px] py-[20px] h-[104px]'>
                    <p className='text-[18px] text-[#111111] font-bold'>{title}</p>
                    <p dangerouslySetInnerHTML={{ __html: message }} className='text-[14px] text-[#111111] font-normal'></p>
                </div>
                <div className='flex'>
                    <button className='w-1/2 font-medium text-[16px] h-[44px] rounded-bl-[14px] border border-[#808080] text-[#0066FF]' onClick={handleCancel}>{cancelLabel}</button>
                    <button className='w-1/2 text-[16px] font-medium h-[44px] rounded-br-[14px] border border-l-0 border-[#808080] text-[#0066FF]' onClick={handleConfirm}>{confirmLabel}</button>
                </div>
            </div>
        </div>
    );
}
