import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../lib/rtk/store";
//export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppDispatch: () => AppDispatch = useDispatch
