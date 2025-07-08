// 유사 상품
import React from 'react';

export default function DetailSimilar({ post }) {
    return (
        <div>
            <img
                src={post.imageUrls}
                alt="이미지"
                className="h-[167px] w-[167px] rounded-[12px]"
            />
            <p className="text-[18px] text-[#111111] font-medium truncate">
                {post.title}
            </p>
            <span
                className={`rounded-[6px] p-[2px] text-[11px] ${post.registrationType === 'LOST'
                        ? 'bg-[#F9EAE0] text-[#FF5900]'
                        : 'bg-[#d3ffe5] text-[#00D455]'
                    }`}
            >
                {post.registrationType === 'LOST' ? '분실했어요' : '주인 찾아요'}
            </span>
            <p className="text-[14px] text-[#808080]">
                {post.lostLocationDong} · {post.timeAgo}
            </p>
            <p className="text-[18px] text-[#111111]">
                현상금 {post.reward.toLocaleString()}원
            </p>
        </div>
    );
}
