// 위치 페이지 이동시 데이터 저장 및 이미지 처리
import { create } from 'zustand';

export const useRegisterStore = create((set) => ({
    selectedTag: '',
    setSelectedTag: (v) => set({ selectedTag: v }),

    selectedCategory: '',
    setSelectedCategory: (v) => set({ selectedCategory: v }),

    title: '',
    setTitle: (v) => set({ title: v }),

    images: [],
    setImages: (v) => set({ images: v }),

    selectedLocation: '',
    setSelectedLocation: (v) => set({ selectedLocation: v }),

    detailLocation: '',
    setDetailLocation: (v) => set({ detailLocation: v }),

    questions: ["", ""],
    setQuestions: (v) => set({ questions: v }),

    selectedDate: null,
    setSelectedDate: (v) => set({ selectedDate: v }),

    selectedTimes: [],
    setSelectedTimes: (v) => set({ selectedTimes: v }),

    description: '',
    setDescription: (v) => set({ description: v }),

    itemName: '',
    setItemName: (v) => set({ itemName: v }),

    reward: '',
    setReward: (v) => set({ reward: v }),

    setLocation: (address, lat, lng) => {
        set({
            selectedLocation: address,
            latitude: lat,
            longitude: lng,
        });
    },

    reset: () => set({
        selectedTag: '',
        selectedCategory: '',
        title: '',
        images: [],
        selectedLocation: '',
        detailLocation: '',
        questions: ["", ""],
        selectedDate: null,
        selectedTimes: [],
        description: '',
        itemName: '',
        reward: '',
    }),
}));
