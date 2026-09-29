import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function InicioTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido al Comedor IPF!</Text>
      
      <Link href="/menu" style={styles.link}>Ir al Menú</Link>
      <Link href="/buscar" style={styles.link}>Buscar Platos</Link>
      <Link href="/ayuda" style={styles.link}>Ayuda</Link>
      <Link href="/login" style={styles.link}>Acceso Cocina</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  link: { fontSize: 18, color: '#007AFF', marginVertical: 10 }
});
