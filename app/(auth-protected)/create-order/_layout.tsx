import { SCREENS } from '@/constants';
import { Stack } from 'expo-router';

export default function CreateOrderLayout() {
  return (
    <Stack>
      <Stack.Screen name={SCREENS.INDEX} options={{ headerShown: false }} />
      <Stack.Screen
        name={SCREENS.CREATE_ORDER_VEHICLE}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREENS.CREATE_ORDER_INFORMATION}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREENS.CREATE_ORDER_PAYMENT}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREENS.CREATE_ORDER_COMPLETED}
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
