import { useNavigate } from 'react-router-dom'
import HeaderIcon from '../assets/logo.svg'
import SearchIcon from '../assets/search.svg'
// 메인페이지 헤더 부분 컴포넌트 입니다.
// 스타일 덮어 쓰기로 배치 속성 다시 적용할 수 있습니다.
export default function MainHeader({className=""}) {
    const navigate = useNavigate();
    // 로고 클릭하면 메인 페이지로 이동
    const handleLogoClick = () => {
        navigate('/');
    }
    // 검색 클릭 시 검색창으로 이동
    const handleSearchClick =() =>{
        navigate('/search')
    }

    return (
        <div className={`flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 h-14 relative overflow-hidden px-6 bg-white ${className}`}>
            <img src={HeaderIcon} alt="ReturnZone 로고" onClick={handleLogoClick}
                className=' cursor-pointer flex-grow-0 flex-shrink-0 w-24 h-[42px] relative' />
            <img src={SearchIcon} alt="검색" onClick={handleSearchClick} className=' cursor-pointer' />
        </div>
    )
}