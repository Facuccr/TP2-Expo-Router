import { View, Text, StyleSheet } from 'react-native';
import { usePathname, useSegments, useLocalSearchParams } from 'expo-router';

const DEBUG = true;

export default function DondeEstoy() {
  if (!DEBUG) return null;

  const pathname = usePathname();
  const segments = useSegments();
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>[DondeEstoy Debug]</Text>
      <Text style={styles.text}>Pathname: {pathname}</Text>
      <Text style={styles.text}>Segments: {JSON.stringify(segments)}</Text>
      <Text style={styles.text}>Params: {JSON.stringify(params)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: '#eee', marginTop: 20, borderTopWidth: 1, borderColor: '#ccc' },
  title: { fontWeight: 'bold', marginBottom: 4 },
  text: { fontSize: 12, fontFamily: 'monospace', color: '#333' }
});
