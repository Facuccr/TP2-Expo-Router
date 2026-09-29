import { View, Text, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useAppContext } from '../context/AppContext';

export default function Confirmar() {
  const { cartItems, totalCarrito, confirmarPedido, nota } = useAppContext();

  if (cartItems.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>No hay pedido para confirmar.</Text>
        <Button title="Volver al inicio" onPress={() => router.replace('/')} />
      </View>
    );
  }

  const handleConfirm = () => {
    const pedido = confirmarPedido();
    // Reemplaza en el historial para evitar volver a la confirmación
    router.replace(`/turno/${pedido.numero}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen de tu pedido</Text>
      <Text style={styles.subtitle}>Ítems ({cartItems.length}):</Text>
      
      {cartItems.map((item) => (
        <Text key={item.instanciaId} style={styles.itemText}>- {item.plato.nombre}</Text>
      ))}

      {nota ? (
        <Text style={styles.nota}>Nota: {nota}</Text>
      ) : null}

      <Text style={styles.total}>Total a pagar: $${totalCarrito}</Text>

      <View style={styles.buttons}>
        <Button title="Confirmar Pedido" onPress={handleConfirm} />
        <View style={{ height: 10 }} />
        <Button title="Cancelar y volver" color="gray" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  itemText: { fontSize: 16, marginBottom: 4 },
  nota: { fontSize: 16, fontStyle: 'italic', marginTop: 10, color: '#555' },
  total: { fontSize: 22, fontWeight: 'bold', marginVertical: 20 },
  buttons: { marginTop: 20 },
  empty: { fontSize: 18, marginBottom: 20, textAlign: 'center' }
});
