import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "./store";

type DispatchFunction = () => AppDispatch;

export const useInfoDispatch: DispatchFunction = useDispatch;
export const useInfoSelector: TypedUseSelectorHook<RootState> = useSelector;
