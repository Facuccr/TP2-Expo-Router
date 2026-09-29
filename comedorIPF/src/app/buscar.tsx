import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams, router, Link } from 'expo-router';
import { platos } from '../data/platos';
import { useState, useEffect } from 'react';

export default function BuscarScreen() {
  const { q = '', categoria = '' } = useLocalSearchParams<{ q: string, categoria: string }>();
  
  const [searchText, setSearchText] = useState(q);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.setParams({ q: searchText, categoria });
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchText, categoria]);

  const filtrados = platos.filter(p => {
    const matchQ = p.nombre.toLowerCase().includes(q.toLowerCase());
    const matchCat = categoria ? p.categoria === categoria : true;
    return matchQ && matchCat;
  });

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        placeholder="Buscar platos..." 
        value={searchText}
        onChangeText={setSearchText}
      />
      <Text style={styles.shareText}>URL compartible: /buscar?q={q}&categoria={categoria}</Text>

      <FlatList
        data={filtrados}
        keyExtractor={p => p.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.nombre}</Text>
            <Link href={`/menu/${item.id}`} style={styles.link}>Ver detalle</Link>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 10 },
  shareText: { fontSize: 12, color: '#666', marginBottom: 16 },
  card: { padding: 16, marginBottom: 12, backgroundColor: '#fff', borderRadius: 8 },
  name: { fontSize: 18 },
  link: { color: '#007AFF', marginTop: 8 }
});
