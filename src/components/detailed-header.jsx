import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { goBack } from '../utils/go-back';
import LArrow from '../assets/좌측꺽쇠.svg'
import OptionButton from '../assets/옵션버튼.svg'
import PenIcon from '../assets/팬.svg'
import DeletesIcon from '../assets/삭제.svg'

export default function DetailedHeader({onEdit, onDelete}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    // 메뉴 닫고 열기
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className='flex justify-between items-center px-[24px] h-[56px]'>
            {/* 뒤로가기 버튼 */}
            <button onClick={() => goBack(navigate)} > <img src={LArrow} alt="<" /></button>
            {/* 옵션 버튼 */}
            <div className="relative" ref={menuRef}>
                <button onClick={() => setMenuOpen((prev) => !prev)}> <img src={OptionButton} alt="옵션" /></button>
                {menuOpen && (
                    <div className="absolute right-0 mt-2 w-[250px] bg-[#00000020] rounded-[12px] shadow-md z-10">
                        <button onClick={onEdit} className="w-full flex pr-[16px] pl-[30px] items-center border border-[#808080] rounded-t-[12px] justify-between px-4 py-2">
                            수정하기 <img src={PenIcon} alt="✏️"/>
                        </button>
                        <button onClick={onDelete} className="w-full pr-[16px] pl-[30px] flex items-center border border-[#808080] rounded-b-[12px] justify-between px-4 py-2">
                            예치금 환불 및 삭제 <img src={DeletesIcon} alt="🗑️" />
                        </button>
                    </div>
                )}
            </div>

        </div>
    )
}