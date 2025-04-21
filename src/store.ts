import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from 'react-redux';
import { store } from './components/layout';

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch = useDispatch<AppDispatch>;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useAppStore: () => typeof store = useStore;

export type { AppDispatch, RootState };

export { useAppDispatch, useAppSelector, useAppStore };
