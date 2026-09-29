import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function AyudaSlug() {
  const { slug } = useLocalSearchParams<{ slug: string[] }>();
  const path = slug ? slug.join('/') : '';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Artículo de ayuda</Text>
      <Text style={styles.content}>Ruta solicitada: {path}</Text>
      <Text style={styles.desc}>Aquí se mostraría el contenido de este artículo específico.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  content: { fontSize: 16, color: '#444', marginBottom: 10 },
  desc: { fontSize: 16 }
});
