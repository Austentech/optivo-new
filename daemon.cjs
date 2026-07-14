const {spawn} = require('child_process');
const fs = require('fs');
const log = '/home/z/my-project/dev.log';

function start() {
  const srv = spawn('npx', ['next', 'start', '-p', '3000'], {
    cwd: '/home/z/my-project',
    stdio: ['ignore', fs.openSync(log, 'a'), fs.openSync(log, 'a')],
    detached: false
  });
  srv.on('exit', (code) => {
    fs.appendFileSync(log, `[${new Date().toISOString()}] Server exited with code ${code}, restarting...\n`);
    setTimeout(start, 2000);
  });
  srv.on('error', (err) => {
    fs.appendFileSync(log, `[${new Date().toISOString()}] Server error: ${err.message}\n`);
    setTimeout(start, 2000);
  });
}

fs.appendFileSync(log, `--- Daemon starting at ${new Date().toISOString()} ---\n`);
start();

// Keep process alive
setInterval(() => {}, 10000);
