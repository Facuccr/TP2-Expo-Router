const fs = require('fs');
const path = require('path');

const files = {
  "src/app/(tabs)/_layout.tsx": `import { Tabs } from 'expo-router/js-tabs';
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
`,
  "src/app/(tabs)/carrito/index.tsx": `import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
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
                <Text style={styles.price}>$\${item.plato.precio}</Text>
              </View>
            )}
          />
          <View style={styles.footer}>
            <Text style={styles.total}>Total: $\${totalCarrito}</Text>
            
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
`,
  "src/app/(tabs)/carrito/nota.tsx": `import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useAppContext } from '../../../context/AppContext';

export default function CarritoNota() {
  const { nota, setNota } = useAppContext();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Escribe una nota para la cocina (opcional):</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        value={nota}
        onChangeText={setNota}
        placeholder="Ej: Sin sal, extra queso..."
      />
      <Button title="Guardar nota" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, textAlignVertical: 'top', marginBottom: 20 }
});
`,
  "src/app/confirmar.tsx": `import { View, Text, Button, StyleSheet } from 'react-native';
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
    router.replace(\`/turno/\${pedido.numero}\`);
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

      <Text style={styles.total}>Total a pagar: $\${totalCarrito}</Text>

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
`,
  "src/app/turno/[numero].tsx": `import { View, Text, Button, StyleSheet } from 'react-native';
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
          : \`Hay \${pedidosAdelante} pedido(s) delante del tuyo.\`}
      </Text>
      
      {pedidosAdelante > 0 && (
        <Text style={styles.time}>Tiempo estimado: {esperaEstimada} minutos</Text>
      )}

      <View style={styles.footer}>
        <Button title="Ir al Inicio" onPress={() => router.replace('/')} />
      </View>
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
`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(__dirname, '..', filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
}
console.log('EPIC 5 views created successfully.');
