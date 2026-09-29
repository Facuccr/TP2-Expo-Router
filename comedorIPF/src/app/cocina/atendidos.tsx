import DondeEstoy from '../../components/DondeEstoy';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useAppContext } from '../../context/AppContext';
import { Pedido } from '../../context/types';

export default function CocinaAtendidos() {
  const { attendedStack } = useAppContext();
  
  const atendidos = attendedStack.aArray().reverse();

  const renderItem = ({ item }: { item: Pedido }) => (
    <View style={styles.card}>
      <Text style={styles.pedidoTitle}>Pedido #{item.numero}</Text>
      <Text style={styles.time}>Creado: {new Date(item.creadoEn).toLocaleTimeString()}</Text>
      <Text style={styles.details}>
        {item.items.length} ítem(s) - Total: $${item.items.reduce((acc, it) => acc + it.plato.precio, 0)}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Atendidos</Text>
      
      {atendidos.length === 0 ? (
        <Text style={styles.empty}>Aún no se atendieron pedidos.</Text>
      ) : (
        <FlatList
          data={atendidos}
          keyExtractor={p => p.numero.toString()}
          renderItem={renderItem}
        />
      )}
      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  empty: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 40 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 12, elevation: 1 },
  pedidoTitle: { fontSize: 18, fontWeight: 'bold' },
  time: { fontSize: 14, color: '#888', marginVertical: 4 },
  details: { fontSize: 16, color: '#444' }
});
