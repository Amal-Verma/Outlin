"use client";

import { configureStore } from "@reduxjs/toolkit";
import boardDetailsReducer from "@/lib/features/workspaceSlice/boardDetailsSlice";
import generateCodeReducer from "./features/workspaceSlice/generateCodeSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      boardDetails: boardDetailsReducer,
      generateCode: generateCodeReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
