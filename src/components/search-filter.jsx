import categoryIcon from '../assets/category.svg';
// 검색 필터 컴포넌트
const FILTER_OPTIONS = ['전체', '위치', '최신순'];
// 완료 게시글 포함, 외부 전달 상태, 기본 선택 필터, 필터 선택 콜백 
export default function SearchFilter({ onToggleCompleted, includeCompleted = false, selectedFilter = '최신순', onSelectFilter }) {
    const handleClickFilter = (filter) => {
        onSelectFilter?.(filter);
    };

    const handleToggleCompleted = () => {
        onToggleCompleted?.();
    };
    return (
        <div className="flex items-center gap-[8px] h-[48px] px-[24px] overflow-x-auto scrollbar-hide">
            {/* 완료된 게시글 포함 토글 버튼 */}
            <button
                onClick={handleToggleCompleted}
                className={`text-[13px] font-medium rounded-[8px] border px-[12px] py-[8px]  ${includeCompleted? 'border-[#0066FF] bg-[#0066FF26]': 'border-[#E6E6E6] text-[#111]'}`}
            >
                완료된 게시글 포함
            </button>

            {/* 필터 선택 버튼 */}
            {FILTER_OPTIONS.map((filter) => (
                <button
                    key={filter}
                    onClick={() => handleClickFilter(filter)}
                    className={`flex items-center text-[13px] font-medium rounded-[8px] pl-[8px] py-[5px] border ${selectedFilter === filter? 'border-[#0066FF] bg-[#0066FF26]': 'border-[#E6E6E6] text-[#111]'}`}
                >
                    {filter} <img src={categoryIcon} alt=""/>
                </button>
            ))}
        </div>
    );
}