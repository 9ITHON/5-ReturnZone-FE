import HomeIcon from '../assets/home.svg'
import RegisterIcon from '../assets/register.svg'
import ChatIcon from '../assets/chat.svg'
import MyPageIcon from '../assets/mypage.svg'
import { useNavigate } from 'react-router-dom'
export default function UnderNavbar() {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    }

    const handleRegisterClick = () => {
        navigate('/Register');
    }

    const handleChatClick = () => {
        navigate('/Chat');
    }
    const handleMyPageClick = () => {
        navigate('/Mypage');
    }
    return(
        <div className='w-full h-[88px] flex fixed bottom-[67px]'>
            <img src={HomeIcon} alt="홈아이콘" onClick={handleHomeClick} className=' cursor-pointer'/>
            <img src={RegisterIcon} alt="등록아이콘" onClick={handleRegisterClick} className=' cursor-pointer'/>
            <img src={ChatIcon} alt="채팅아이콘" onClick={handleChatClick} className=' cursor-pointer'/>
            <img src={MyPageIcon} alt="마이페이지아이콘" onClick={handleMyPageClick} className=' cursor-pointer'/>
        </div>
    )
}