// Redux Hooks Import
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// Type Imports for Redux
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
