import { Stack } from 'expo-router';
export default function CarritoLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Tu Carrito' }} />
      <Stack.Screen name="nota" options={{ title: 'Nota para Cocina', presentation: 'modal' }} />
    </Stack>
  );
}
