import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';
import { platos } from '../../data/platos';
import { Categoria } from '../../context/types';

const categoriasValidas: Categoria[] = ['desayuno', 'almuerzo', 'bebidas', 'kiosco'];

export default function CategoriaScreen() {
  const { categoria } = useLocalSearchParams<{ categoria: string }>();
  
  if (!categoriasValidas.includes(categoria as Categoria)) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Categoría inválida.</Text>
      </View>
    );
  }

  const filtrados = platos.filter(p => p.categoria === categoria);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Platos de: {categoria}</Text>
      <FlatList
        data={filtrados}
        keyExtractor={p => p.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.nombre}</Text>
            <Link href={`/menu/${item.id}`} style={styles.link}>Ver detalle</Link>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  error: { fontSize: 18, color: 'red' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textTransform: 'capitalize' },
  card: { padding: 16, marginBottom: 12, backgroundColor: '#fff', borderRadius: 8 },
  name: { fontSize: 18 },
  link: { color: '#007AFF', marginTop: 8 }
});
