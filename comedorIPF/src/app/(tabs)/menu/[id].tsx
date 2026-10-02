import DondeEstoy from '../../../components/DondeEstoy';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { platos } from '../../../data/platos';
import { useAppContext } from '../../../context/AppContext';

export default function MenuDetalle() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { agregarAlCarrito } = useAppContext();
  
  const platoId = Number(id);
  const plato = platos.find(p => p.id === platoId);

  if (!plato) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'No encontrado' }} />
        <Text style={styles.error}>Plato no encontrado.</Text>
        <DondeEstoy />
    </View>
  );
}

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: plato.nombre }} />
      <Text style={styles.title}>{plato.nombre}</Text>
      <Text style={styles.category}>Categoría: {plato.categoria}</Text>
      <Text style={styles.desc}>{plato.descripcion}</Text>
      <Text style={styles.price}>${plato.precio}</Text>
      
      <Button title="Agregar al carrito" onPress={() => agregarAlCarrito(plato)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  error: { fontSize: 18, color: 'red' },
  title: { fontSize: 24, fontWeight: 'bold' },
  category: { fontSize: 14, color: '#666', marginBottom: 10, textTransform: 'capitalize' },
  desc: { fontSize: 16, marginVertical: 10 },
  price: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 }
});
