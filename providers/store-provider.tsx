import { useRef } from 'react';
import { Provider } from 'react-redux';
import { AppStore, store } from '../redux/store';

export default function StoreProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = store;
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
