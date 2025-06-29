import { useNavigate } from 'react-router-dom'
import HeaderIcon from '../assets/logo.svg'

export default function Header() {
    const navigate = useNavigate();
    // 로고 클릭하면 메인 페이지로 이동
    const handleLogoClick = () => {
        navigate('/');
    }

    return (
        <header className='mt-[54px] w-[402px] h-[64px] px-[8px] py-[16px] border-b-[1px] border-b-[#DDE1E6]'>
            <img src={HeaderIcon} alt="ReturnZone 로고" onClick={handleLogoClick}
                className=' cursor-pointer' />
        </header>
    )
}