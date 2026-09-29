const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../src/components');
if (!fs.existsSync(componentsDir)) fs.mkdirSync(componentsDir, { recursive: true });

fs.writeFileSync(path.join(componentsDir, 'DondeEstoy.tsx'), `import { View, Text, StyleSheet } from 'react-native';
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
`, 'utf8');

fs.writeFileSync(path.join(__dirname, '../src/app/pedido.tsx'), `import { Redirect } from 'expo-router';

export default function PedidoLegacy() {
  return <Redirect href="/carrito" />;
}
`, 'utf8');

fs.writeFileSync(path.join(__dirname, '../src/app/+not-found.tsx'), `import { View, Text, StyleSheet } from 'react-native';
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
`, 'utf8');

const appDir = path.join(__dirname, '../src/app');
const sep = path.sep;

function injectDondeEstoy(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      injectDondeEstoy(fullPath);
    } else if (fullPath.endsWith('.tsx') && !item.startsWith('_') && item !== '+not-found.tsx' && item !== 'pedido.tsx') {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (!content.includes('DondeEstoy')) {
        // Calcular la profundidad de directorios a partir de src/app
        const relativeToApp = path.relative(appDir, dir);
        const depth = relativeToApp === '' ? 0 : relativeToApp.split(sep).length;
        
        const prefix = '../'.repeat(depth + 1);
        const relativePath = prefix + 'components/DondeEstoy';
        
        content = "import DondeEstoy from '" + relativePath + "';\n" + content;
        
        // Agregar al final del View principal (que suele ser el penúltimo paso del componente)
        content = content.replace(/<\/View>\s*\);?\s*}/, '  <DondeEstoy />\n    </View>\n  );\n}');
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

injectDondeEstoy(appDir);
console.log('EPIC 7 completed via script.');
