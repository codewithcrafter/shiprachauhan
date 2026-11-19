/**
 * REAL-TIME WATCHER DAEMON FOR SHIPRA CHAUHAN WEB PLATFORM
 * Watches all HTML and content files and regenerates sitemap.xml & llms.txt within 300ms of any edit.
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const GENERATE_SCRIPT = path.join(__dirname, 'generate-sitemap-llms.js');

let debounceTimer = null;

function triggerSync(eventType, filename) {
  if (!filename) return;
  if (!filename.endsWith('.html') && !filename.endsWith('.js') && !filename.endsWith('.css')) return;
  if (filename === 'sitemap.xml' || filename === 'llms.txt') return;

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    console.log(`[WATCHER] Detected ${eventType} in ${filename}. Regenerating sitemap.xml and llms.txt...`);
    exec(`node "${GENERATE_SCRIPT}"`, (err, stdout, stderr) => {
      if (err) {
        console.error('[WATCHER] Error regenerating files:', stderr);
      } else {
        console.log('[WATCHER] Sync complete:\n' + stdout.trim());
      }
    });
  }, 300);
}

console.log('[WATCHER] Starting Shipra Chauhan sync watcher daemon on:', ROOT_DIR);
fs.watch(ROOT_DIR, { recursive: true }, (eventType, filename) => {
  triggerSync(eventType, filename);
});

// Run once on startup
exec(`node "${GENERATE_SCRIPT}"`, (err, stdout) => {
  if (!err) console.log('[WATCHER] Initial build complete:\n' + stdout.trim());
});

