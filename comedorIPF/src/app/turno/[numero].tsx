import DondeEstoy from '../../components/DondeEstoy';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useAppContext } from '../../context/AppContext';

export default function Turno() {
  const { numero } = useLocalSearchParams<{ numero: string }>();
  const numId = Number(numero);
  
  const { ordersQueue } = useAppContext();
  
  const arrayPedidos = ordersQueue.aArray();
  const index = arrayPedidos.findIndex(p => p.numero === numId);

  if (index === -1) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Tu pedido ya no está en la cola.</Text>
        <Text style={styles.info}>Es posible que ya haya sido atendido o el número sea incorrecto.</Text>
        <Button title="Volver al Inicio" onPress={() => router.replace('/')} />
      </View>
    );
  }

  const pedidosAdelante = index;
  const esperaEstimada = pedidosAdelante * 3;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Pedido Confirmado!</Text>
      
      <View style={styles.card}>
        <Text style={styles.turnoLabel}>Tu número de turno es:</Text>
        <Text style={styles.turnoValue}>#{numero}</Text>
      </View>
      
      <Text style={styles.status}>
        {pedidosAdelante === 0 
          ? "¡Tu pedido es el próximo en prepararse!" 
          : `Hay ${pedidosAdelante} pedido(s) delante del tuyo.`}
      </Text>
      
      {pedidosAdelante > 0 && (
        <Text style={styles.time}>Tiempo estimado: {esperaEstimada} minutos</Text>
      )}

      <View style={styles.footer}>
        <Button title="Ir al Inicio" onPress={() => router.replace('/')} />
      </View>
      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, alignItems: 'center' },
  error: { fontSize: 20, color: 'red', marginBottom: 10, fontWeight: 'bold' },
  info: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, color: '#4CAF50' },
  card: { backgroundColor: '#fff', padding: 30, borderRadius: 16, alignItems: 'center', elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, marginBottom: 30, width: '100%' },
  turnoLabel: { fontSize: 18, color: '#666', marginBottom: 10 },
  turnoValue: { fontSize: 48, fontWeight: 'bold', color: '#007AFF' },
  status: { fontSize: 18, textAlign: 'center', marginBottom: 10 },
  time: { fontSize: 16, color: '#888', fontStyle: 'italic' },
  footer: { marginTop: 40, width: '100%' }
});
