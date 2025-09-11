import type { Dispatch, ReactNode } from "react";
import { createContext, useContext, useReducer } from "react";

type AppState = {
  sidebar: boolean;
  trendyTab: string;
  ratedTab: string;
};

type AppAction =
  | { type: "sidebar"; payload: boolean }
  | { type: "trendyTab"; payload: string }
  | { type: "ratedTab"; payload: string };

type AppContextType = {
  state: AppState;
  dispatch: Dispatch<AppAction>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
  sidebar: false,
  trendyTab: "movies",
  ratedTab: "movies",
};

function AppReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "sidebar":
      return { ...state, sidebar: action.payload };
    case "trendyTab":
      return { ...state, trendyTab: action.payload };
    case "ratedTab":
      return { ...state, ratedTab: action.payload };
    default:
      return state;
  }
}

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within a ModalsProvider");
  }
  return context;
};
