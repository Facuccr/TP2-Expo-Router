import DondeEstoy from '../../../components/DondeEstoy';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useAppContext } from '../../../context/AppContext';

export default function CarritoIndex() {
  const { cartItems, totalCarrito, deshacerUltimo, undoStack } = useAppContext();

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.empty}>El carrito está vacío.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.instanciaId}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.name}>{item.plato.nombre}</Text>
                <Text style={styles.price}>${item.plato.precio}</Text>
              </View>
            )}
          />
          <View style={styles.footer}>
            <Text style={styles.total}>Total: ${totalCarrito}</Text>
            
            <View style={styles.buttonsRow}>
              <Button 
                title="Deshacer último" 
                color="red"
                disabled={undoStack.vacia} 
                onPress={deshacerUltimo} 
              />
              <View style={styles.spacer} />
              <Button 
                title="Agregar nota" 
                onPress={() => router.push('/carrito/nota')} 
              />
            </View>
            
            <View style={styles.confirmarContainer}>
              <Button 
                title="Continuar a Confirmación" 
                onPress={() => router.push('/confirmar')} 
              />
            </View>
          </View>
        </>
      )}
      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  empty: { fontSize: 18, textAlign: 'center', marginTop: 40 },
  card: { padding: 12, borderBottomWidth: 1, borderColor: '#eee', flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontSize: 16 },
  price: { fontSize: 16, fontWeight: 'bold' },
  footer: { marginTop: 20, paddingVertical: 10, borderTopWidth: 1, borderColor: '#ccc' },
  total: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, textAlign: 'right' },
  buttonsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  spacer: { width: 10 },
  confirmarContainer: { marginTop: 10 }
});
