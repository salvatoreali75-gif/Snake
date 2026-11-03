// Copia i file del gioco web nella cartella www, che Capacitor mette dentro l'app Android.
import { mkdirSync, rmSync, copyFileSync } from 'node:fs';
const FILES = ['index.html', 'privacy.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png'];
rmSync('www', { recursive: true, force: true });
mkdirSync('www');
for (const f of FILES) copyFileSync(f, 'www/' + f);
console.log('www pronto:', FILES.length, 'file');
