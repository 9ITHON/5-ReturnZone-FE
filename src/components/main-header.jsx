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
        <div className={`w-[390px] h-[56px] px-[24px] py-[16px] flex items-center justify-between ${className}`}>
            <img src={HeaderIcon} alt="ReturnZone 로고" onClick={handleLogoClick}
                className=' cursor-pointer' />
            <img src={SearchIcon} alt="검색" onClick={handleSearchClick} />
        </div>
    )
}