import { Tabs } from 'expo-router/js-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../../context/AppContext';

export default function TabsLayout() {
  const { cantidadCarrito } = useAppContext();

  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Inicio', tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> }} />
      <Tabs.Screen name="menu" options={{ title: 'Menú', headerShown: false, tabBarIcon: ({ color }) => <Ionicons name="restaurant" size={24} color={color} /> }} />
      <Tabs.Screen 
        name="carrito" 
        options={{ 
          title: 'Carrito', 
          headerShown: false, 
          tabBarIcon: ({ color }) => <Ionicons name="cart" size={24} color={color} />,
          tabBarBadge: cantidadCarrito > 0 ? cantidadCarrito : undefined
        }} 
      />
    </Tabs>
  );
}
