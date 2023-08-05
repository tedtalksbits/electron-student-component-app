import { appDispatch, rootState } from '@/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<appDispatch>();
export const useAppSelector: TypedUseSelectorHook<rootState> = useSelector;
