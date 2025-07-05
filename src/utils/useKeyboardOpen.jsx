// 키보드 상태에 따른 버튼 배치를 위한 유틸 정의
import { useEffect, useState } from "react";

export function UseKeyboardOpen() {
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

    useEffect(() => {
        const initialHeight = window.innerHeight;

        const handleResize = () => {
            const isOpen = window.innerHeight < initialHeight - 100;
            setIsKeyboardOpen(isOpen);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isKeyboardOpen;
}