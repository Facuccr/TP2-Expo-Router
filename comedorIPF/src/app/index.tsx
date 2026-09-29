import DondeEstoy from '../components/DondeEstoy';
import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hola, TP2 Comedor IPF</Text>
      <DondeEstoy />
    </View>
  );
}
