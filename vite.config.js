import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    {
      name: 'copy-script',
      closeBundle() {
        try {
          fs.copyFileSync(
            path.resolve(__dirname, 'script.js'),
            path.resolve(__dirname, 'dist/script.js')
          );
          console.log('✓ Successfully copied script.js to dist/script.js');
        } catch (err) {
          console.error('Error copying script.js:', err);
        }
      }
    }
  ]
});
