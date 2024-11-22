import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type operationNames = "addition" | "subtraction" | "multiplication" | "division";
export type operation = {
    symbol: string;
    enabled: boolean;
    firstMin: number;
    firstMax: number;
    secondMin: number;
    secondMax: number;
    update: <K extends keyof operation>(property: K, value: operation[K]) => void;
}

export type operations = {
    [key in operationNames]: operation;
}

export type config = {
    roundTime: number;
    operations: operations;
    setRoundTime: (newRoundTime: number) => void;
}

export const useConfigStore = create<config>()(
    immer((set) => ({
        roundTime: 30,
        operations: {
            addition: {
                symbol: "+",
                enabled: true,
                firstMin: -25,
                firstMax: 25,
                secondMin: -25,
                secondMax: 25,
                update: (property, value) => set((state) => {
                    state.operations.addition[property] = value;
                })
            },
            subtraction: {
                symbol: "-",
                enabled: true,
                firstMin: -25,
                firstMax: 25,
                secondMin: -25,
                secondMax: 25,
                update: (property, value) => set((state) => {
                    state.operations.subtraction[property] = value;
                })
            },
            multiplication: {
                symbol: "×",
                enabled: true,
                firstMin: -10,
                firstMax: 10,
                secondMin: -10,
                secondMax: 10,
                update: (property, value) => set((state) => {
                    state.operations.multiplication[property] = value;
                })

            },
            division: {
                symbol: "÷",
                enabled: true,
                firstMin: -10,
                firstMax: 10,
                secondMin: -10,
                secondMax: 10,
                update: (property, value) => set((state) => {
                    state.operations.division[property] = value;
                })
            }
        },
        setRoundTime: (newRoundTime: number) => set((state) => {
            state.roundTime = newRoundTime;
        }),
        
    }))
)

type page = 'config' | 'playing' | 'results';

export type appState = {
    page: page;
    setPage: (newPage: page) => void;
}

export const useAppStore = create<appState>()((set) => ({
    page: 'config',
    setPage: (newPage: page) => set(() => ({
        page: newPage
    }))
}))