import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
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
