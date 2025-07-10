// 이미지 표시 컴포넌트 
export default function ImageUploadItem({ image, index, onRemove }) {
    return (
        <div className="relative w-24 h-24 rounded-md overflow-hidden border border-gray-300">
            <img
                src={URL.createObjectURL(image)}
                alt={`uploaded-${index}`}
                className="object-cover w-full h-full"
            />
            <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-white border border-black text-black text-xs flex items-center justify-center"
            >
                ×
            </button>
        </div>
    );
}