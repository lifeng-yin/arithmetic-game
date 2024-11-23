import { create } from "zustand";

type page = 'config' | 'playing' | 'results';
type dataPoint = {
    time: number; 
    pps: number; 
}

export type appState = {
    page: page;
    setPage: (newPage: page) => void;
    lastRound?: {
        score: number;
        data: dataPoint[];
    },
    setLastRound: (data: { score: number, data: dataPoint[] }) => void;
}

export const useAppStore = create<appState>()((set) => ({
    page: 'config',
    setPage: (newPage: page) => set(() => ({
        page: newPage
    })),
    setLastRound: ({ score, data } : { score: number, data: dataPoint[] }) => set((state) => ({
        ...state,
        lastRound: {
            score,
            data
        }
    }))
}))