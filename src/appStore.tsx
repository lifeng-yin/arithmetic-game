import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type appState = "settings" | "playing" | "results";

interface operationSettings {
  symbol: string;
  firstMin: number;
  firstMax: number;
  secondMin: number;
  secondMax: number;
}

type operationSettingsKey = keyof operationSettings;

type operation = "addition" | "subtraction" | "multiplication" | "division";

interface appStoreState {
  appState: appState;
  updateAppState: (newAppState: appState) => void;
  settings: {
    timeLimit: number;
    updateTimeLimit: (newTime: 30 | 60 | 90 | 120) => void;
    enabledOperations: operation[];
    operations: {
      addition: operationSettings;
      subtraction: operationSettings;
      multiplication: operationSettings;
      division: operationSettings;
    };
    updateOperation: (
      operation: operation,
      property: operationSettingsKey,
      newValue: operationSettings[operationSettingsKey],
    ) => void;
  };
  score: number;
}

const useAppStore = create<appStoreState>()(
  immer((set) => ({
    appState: "settings",
    updateAppState: (newAppState) =>
      set((state) => {
        state.appState = newAppState;
      }),
    settings: {
      enabledOperations: [
        "addition",
        "subtraction",
        "multiplication",
        "division",
      ],
      operations: {
        addition: {
          symbol: "+",
          firstMin: -25,
          firstMax: 25,
          secondMin: -25,
          secondMax: 25,
        },
        subtraction: {
          symbol: "-",
          firstMin: -25,
          firstMax: 25,
          secondMin: -25,
          secondMax: 25,
        },
        multiplication: {
          symbol: "×",
          firstMin: -10,
          firstMax: 10,
          secondMin: -10,
          secondMax: 10,
        },
        division: {
          symbol: "÷",
          firstMin: -10,
          firstMax: 10,
          secondMin: -10,
          secondMax: 10,
        },
        updateOperation: (operation, property, newValue) => set(appState => {
            /*appState.settings.operations[operation][property] = newValue;*/
        }),
      //toggleOperation: (operation: operation) => set(appState => ())
      timeLimit: 30,
      updateTimeLimit: (newTime: 30 | 60 | 90 | 120) =>
        set((appState) => ({
          ...appState,
          settings: {
            ...appState.settings,
            timeLimit: newTime,
          },
        })),
    },
    score: 0,
  })),
);

export default useAppStore;
