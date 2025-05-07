import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Now you can use __dirname like usual
const componentsPath = path.join(__dirname, 'app/investor');

fs.readdirSync(componentsPath).forEach((folder) => {
  const folderPath = path.join(componentsPath, folder);
  const newFilePath = path.join(folderPath, 'page.tsx');

  if (fs.statSync(folderPath).isDirectory()) {
    const files = fs.readdirSync(folderPath);
    const tsxFile = files.find((f) => f.endsWith('.tsx') && !f.startsWith('page'));

    if (tsxFile) {
      const oldPath = path.join(folderPath, tsxFile);
      fs.renameSync(oldPath, newFilePath);
      console.log(`✅ Renamed ${tsxFile} ➜ page.tsx in ${folder}`);
    }
  }
});
