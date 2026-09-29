const fs = require('fs');
const path = require('path');
const sep = path.sep;
const appDir = 'src/app';

function fix(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) fix(fullPath);
    else if (fullPath.endsWith('.tsx') && !item.startsWith('_') && item !== 'pedido.tsx' && item !== '+not-found.tsx') {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (!content.includes('DondeEstoy')) {
        const relativeToApp = path.relative(appDir, dir);
        const depth = relativeToApp === '' ? 0 : relativeToApp.split(sep).length;
        const prefix = '../'.repeat(depth + 1);
        const relativePath = prefix + 'components/DondeEstoy';
        
        content = "import DondeEstoy from '" + relativePath + "';\n" + content;
        
        // Find the LAST </View>
        const lastIndex = content.lastIndexOf('</View>');
        if (lastIndex !== -1) {
          content = content.slice(0, lastIndex) + '  <DondeEstoy />\n    </View>' + content.slice(lastIndex + 7);
        }
        
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}
fix(appDir);
