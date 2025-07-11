import { formatNumber } from '../utils/formatNumber';

import ErrorIcon from '../assets/경고문.svg'

export default function MyPagePoint({userInfo}) {
    return (
        <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[2px]">
                <p className="text-[16px] text-[#111111] font-medium">보유 포인트 </p>
                <p className="text-[22px] text-[#111111] font-semibold">{formatNumber(userInfo.point)}원</p>
            </div>
            <div className="flex flex-col gap-[8px]">
                <div className="flex flex-col gap-[2px]">
                    <p className="text-[16px] text-[#111111] font-medium">환전 가능 포인트</p>
                    <p className="text-[36px] text-[#0066FF] font-bold">{formatNumber(userInfo.point)}원</p>
                </div>
                <p className="flex gap-[4px] text-[14px] text-[#808080] font-normal"><img className="fill-[#808080]" src={ErrorIcon} alt="!" /> 환전은 영업일 기준 1~3일 소요됩니다.</p>
            </div>
        </div>
    )
}