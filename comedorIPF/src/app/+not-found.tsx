import { View, Text, StyleSheet } from 'react-native';
import { Link, usePathname } from 'expo-router';
import DondeEstoy from '../components/DondeEstoy';

export default function NotFoundScreen() {
  const pathname = usePathname();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>404 - Ruta no encontrada</Text>
      <Text style={styles.url}>La URL intentada: {pathname}</Text>
      <Link href="/" style={styles.link}>Volver al inicio</Link>
      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  url: { fontSize: 16, marginBottom: 20, color: 'red' },
  link: { fontSize: 18, color: '#007AFF' }
});
