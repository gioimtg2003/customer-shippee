import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { me } from '@/redux/slices';
import React, { useEffect } from 'react';
import { View } from 'react-native';

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider(props: Readonly<Props>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(me());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLoading) {
    return (
      <View className='flex-1 items-center justify-center'>
        <></>
      </View>
    );
  }
  return <>{props?.children}</>;
}
