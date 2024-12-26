import { SCREENS } from '@/constants';
import { Stack } from 'expo-router';

export default function AuthProtectedLayout() {
  return (
    <Stack>
      <Stack.Screen name={SCREENS.TABS} options={{ headerShown: false }} />
      <Stack.Screen
        name={SCREENS.TRACKING_ORDER}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREENS.TRACKING_ORDER}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={SCREENS.AI} options={{ headerShown: false }} />
    </Stack>
  );
}
