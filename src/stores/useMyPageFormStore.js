// 마이 페이지 수정 시 데이터 유지
import { create } from 'zustand';

const useMyPageFormStore = create((set) => ({
    nickname: '',
    password: '',
    passwordConfirm: '',
    bankName: '',
    accountNumber: '',
    accountHolder: '',
    detailLocation: '',
    previewImage: null,
    selectedImageFile: null,

    // Setter들
    setForm: (form) => set(form),
    resetForm: () => set({
        nickname: '',
        password: '',
        passwordConfirm: '',
        bankName: '',
        accountNumber: '',
        accountHolder: '',
        detailLocation: '',
        previewImage: null,
        selectedImageFile: null,
    }),
}));

export default useMyPageFormStore;
