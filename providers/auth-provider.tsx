import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { me } from '@/redux/slices';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading ...</Text>
      </View>
    );
  }
  return <>{props?.children}</>;
}
