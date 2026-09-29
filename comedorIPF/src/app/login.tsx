import DondeEstoy from '../components/DondeEstoy';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
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
      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 16 },
  spacer: { height: 10 }
});
