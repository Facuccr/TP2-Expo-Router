import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function AyudaIndex() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Centro de Ayuda</Text>
      <Link href="/ayuda/pedidos/como-hacer" style={styles.link}>¿Cómo hacer un pedido?</Link>
      <Link href="/ayuda/cocina/acceso" style={styles.link}>Acceso para personal de cocina</Link>
      <Link href="/ayuda/faq" style={styles.link}>Preguntas frecuentes</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  link: { fontSize: 16, color: '#007AFF', marginVertical: 8 }
});
