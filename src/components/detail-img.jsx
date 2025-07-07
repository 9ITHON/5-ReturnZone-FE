import { useState } from "react";
import { useSwipeable } from "react-swipeable";
// 이미지 컴포넌트
export default function DetailImg({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const total = images.length;
    //이미지 넘기기
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => setCurrentIndex((prev) => Math.min(prev + 1, total - 1)),
        onSwipedRight: () => setCurrentIndex((prev) => Math.max(prev - 1, 0)),
        trackMouse: true, // 마우스 드래그도 허용
    });

    return (
        <div className="relative w-[342px] h-[264px] overflow-hidden rounded-[12px]" {...swipeHandlers}>
            <img
                src={images[currentIndex]}
                alt={`image-${currentIndex}`}
                className="w-full h-full object-cover"
            />
            <span className="absolute bottom-2 right-2 bg-[#00000066] py-[4px] px-[10px] text-[#ffffff] text-[13px] rounded-[23px]">
                {currentIndex + 1} / {total}
            </span>
        </div>
    );
}
