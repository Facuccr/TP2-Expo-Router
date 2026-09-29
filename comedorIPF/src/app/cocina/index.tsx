import DondeEstoy from '../../components/DondeEstoy';
import { View, Text, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useAppContext } from '../../context/AppContext';

export default function CocinaIndex() {
  const { ordersQueue, atenderSiguiente, logout } = useAppContext();
  
  const pedidoFrente = ordersQueue.frente();
  const cantidadEspera = ordersQueue.tamanio;

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Panel de Cocina</Text>
        <Button title="Cerrar sesión" color="red" onPress={handleLogout} />
      </View>

      <Text style={styles.info}>Pedidos en espera: {cantidadEspera}</Text>

      {pedidoFrente ? (
        <View style={styles.card}>
          <Text style={styles.pedidoTitle}>Pedido en preparación: #{pedidoFrente.numero}</Text>
          <Text style={styles.time}>Creado: {new Date(pedidoFrente.creadoEn).toLocaleTimeString()}</Text>
          
          <Text style={styles.subtitle}>Ítems:</Text>
          {pedidoFrente.items.map(item => (
            <Text key={item.instanciaId} style={styles.item}>- {item.cantidad}x {item.plato.nombre}</Text>
          ))}
          
          {pedidoFrente.nota ? (
            <Text style={styles.nota}>Nota: {pedidoFrente.nota}</Text>
          ) : null}

          <View style={styles.action}>
            <Button title="Atender Siguiente" onPress={atenderSiguiente} />
          </View>
        </View>
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>No hay pedidos en espera.</Text>
        </View>
      )}
      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  info: { fontSize: 18, marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
  pedidoTitle: { fontSize: 22, fontWeight: 'bold', color: '#007AFF', marginBottom: 10 },
  time: { fontSize: 14, color: '#888', marginBottom: 10 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 5 },
  item: { fontSize: 16, marginBottom: 4 },
  nota: { fontSize: 16, color: '#d9534f', fontStyle: 'italic', marginTop: 15, padding: 10, backgroundColor: '#fdf3f2', borderRadius: 8 },
  action: { marginTop: 20 },
  emptyCard: { padding: 30, backgroundColor: '#f9f9f9', borderRadius: 12, alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#666' }
});
