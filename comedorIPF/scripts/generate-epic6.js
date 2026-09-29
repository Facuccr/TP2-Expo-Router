const fs = require('fs');
const path = require('path');

const files = {
  "src/app/login.tsx": `import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useAppContext } from '../context/AppContext';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const { login } = useAppContext();

  const handleLogin = () => {
    if (usuario === 'cocina' && clave === '1234') {
      login();
      // Redirigir a la cocina; al cambiar el estado, el Root Layout monta esta nueva ruta
      router.replace('/cocina');
    } else {
      Alert.alert('Error', 'Credenciales incorrectas');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acceso a Cocina</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={clave}
        onChangeText={setClave}
      />
      <Button title="Ingresar" onPress={handleLogin} />
      <View style={styles.spacer} />
      <Button title="Cancelar" color="gray" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 16 },
  spacer: { height: 10 }
});
`,

  "src/app/cocina/index.tsx": `import { View, Text, Button, StyleSheet } from 'react-native';
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
`,

  "src/app/cocina/atendidos.tsx": `import { View, Text, FlatList, StyleSheet } from 'react-native';
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
        {item.items.length} ítem(s) - Total: $\${item.items.reduce((acc, it) => acc + it.plato.precio, 0)}
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
`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(__dirname, '..', filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
}
console.log('EPIC 6 views created successfully.');
