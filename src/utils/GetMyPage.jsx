import axios from "axios";

const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:8080";
//실제 API 호출
export const GetMyPage = async (userId) => {
    if (!userId) throw new Error("userId is required");

    const response = await axios.get(`${apiBase}/api/v1/mypage`, {
        headers: {
            "X-USER-ID": userId,
        },
    });

    return response.data;
};

// // 테스트용 더미 데이터
// export const GetMyPageDummy = async () => {
//     return {
//         nickname: "홍길동",
//         imageUrl: "https://dimg.donga.com/wps/NEWS/IMAGE/2024/06/10/125352013.2.jpg",
//         point: 100000,
//         bankName: "우리은행",
//         accountNumber : "123-456-7890123",
//         accountHolder : "홍길동"
//     };
// };
