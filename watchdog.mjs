import { spawn } from 'child_process';
import { writeFileSync } from 'fs';

const LOG = '/home/z/my-project/watchdog.log';
function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  writeFileSync(LOG, line, { flag: 'a' });
}

log('Watchdog starting');

let child = null;
function start() {
  log('Starting next start...');
  child = spawn('npx', ['next', 'start', '-p', '3000'], {
    cwd: '/home/z/my-project',
    env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=256' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  child.stdout?.on('data', (d) => process.stdout.write(d));
  child.stderr?.on('data', (d) => process.stderr.write(d));
  child.on('exit', (code) => {
    log(`Server exited with code ${code}, restarting in 1s...`);
    setTimeout(start, 1000);
  });
}

start();