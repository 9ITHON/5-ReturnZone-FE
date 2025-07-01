import userHeader from '../assets/사용자바.svg'
//사용자 상태바 컴포넌트 입니다. (지금은 사용하지 않습니다.)
export default function UserHeader(){
    return(
        <div className='m-0'>
            <img src={userHeader} alt="사용자 상태바" />
        </div>
    )
}