import { useNavigate } from 'react-router-dom'
import HeaderIcon from '../assets/logo.svg'
// 로고랑 타이틀을 반환하는 컴포넌트 입니다.
// 스타일 덮어 쓰기로 배치 속성 다시 적용할 수 있습니다.
export default function Header({title,className=""}) {
    const navigate = useNavigate();
    // 로고 클릭하면 메인 페이지로 이동
    const handleLogoClick = () => {
        navigate('/');
    }

    return (
        <div className={`w-[402px] h-[64px] px-[8px] py-[16px] flex flex-col items-center justify-center ${className}`}>
            <img src={HeaderIcon} alt="ReturnZone 로고" onClick={handleLogoClick}
                className=' cursor-pointer' />
            <h1 className=' text-[32px] text-[#111111] font-semibold'>
                {title}
            </h1>
        </div>
    )
}