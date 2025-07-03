import InputField from "../components/input-field";
import Button from "../components/button";
import MainHeader from "../components/main-header";
import { useRef, useState } from "react";
import axios from "axios";

export default function RegisterPage() {
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.slice(0, 5 - images.length);

        const imageUrls = newImages.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setImages((prev) => [...prev, ...imageUrls]);
    };

    const handleDeleteImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const triggerFileSelect = () => {
        if (images.length < 5) fileInputRef.current.click();
    };

    return(
        <div>
            <div>
                <MainHeader/>
            </div>
            <div>
                메인 등록 란
            </div>
            <div>
                하단 바
            </div>
        </div>
    )
}