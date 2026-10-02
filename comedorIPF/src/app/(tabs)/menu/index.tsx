import DondeEstoy from '../../../components/DondeEstoy';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { platos } from '../../../data/platos';
import { Plato } from '../../../context/types';

export default function MenuIndex() {
  const renderItem = ({ item }: { item: Plato }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.nombre}</Text>
      <Text style={styles.price}>${item.precio}</Text>
      <Link href={`/menu/${item.id}`} style={styles.link}>Ver detalle</Link>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={platos}
        keyExtractor={p => p.id.toString()}
        renderItem={renderItem}
      />
      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { padding: 16, marginBottom: 12, backgroundColor: '#fff', borderRadius: 8 },
  name: { fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 16, color: '#444', marginVertical: 4 },
  link: { color: '#007AFF', marginTop: 8 }
});
