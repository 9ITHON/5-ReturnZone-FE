
import XButton from '../assets/검색x.svg'
import SearchIcon from '../assets/검색search.svg'

// 검색어, 검색어 클릭시, 삭제 버튼 클릭
export default function SearchDetail ({label, onClick, onDelete }){
    // 부모 요소 클릭 시 함수 병렬 발생 방지
    const handleDeleteClick = (e) =>{
        e.stopPropagation();
        onDelete();
    }
    return(
        <li onClick={onClick} className='flex justify-between items-center h-[48px]'>
            <div className='flex justify-center items-center gap-[8px]'>
                <img src={SearchIcon} alt="최근 검색" />
                <p>{label}</p>
            </div>
                <button onClick={handleDeleteClick} > <img src={XButton} alt="삭제" /></button>
        </li>
    )
}