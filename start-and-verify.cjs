const {spawn, execSync} = require('child_process');
const http = require('http');

console.log('Starting production server...');
const srv = spawn('npx', ['next', 'start', '-p', '3000'], {
  cwd: '/home/z/my-project',
  stdio: ['ignore', 'pipe', 'pipe']
});
srv.stdout.on('data', d => process.stdout.write(d));
srv.stderr.on('data', d => process.stderr.write(d));

setTimeout(() => {
  console.log('\n--- Making test request ---');
  const req = http.get('http://127.0.0.1:3000/', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(`Status: ${res.statusCode}`);
      console.log(`Size: ${data.length} bytes`);
      console.log(`Has Optivo: ${data.includes('Optivo')}`);
      console.log(`Has logo: ${data.includes('optivo-logo')}`);
      console.log(`Has Navbar: ${data.includes('navbar') || data.includes('Navbar')}`);
      console.log(`Has Home content: ${data.includes('Performance-Driven')}`);
      console.log(`Has Footer: ${data.includes('Optivo Solutions')}`);
      
      // Check for any error indicators
      if (data.includes('error') || data.includes('Error')) {
        console.log('WARNING: Page contains error text');
      }
      
      // Test API routes
      console.log('\n--- Testing API routes ---');
      testAPI('/api/admin/auth/me', 'Auth check (expect 401)');
      
      // Keep server running
      console.log('\n--- Server verified, keeping alive ---');
    });
  });
  req.on('error', (e) => {
    console.error('Request failed:', e.message);
  });
}, 3000);

function testAPI(path, label) {
  try {
    const res = execSync(`curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000${path}`, {timeout: 5000});
    console.log(`${label}: ${res.trim()}`);
  } catch(e) {
    console.log(`${label}: FAILED (${e.message})`);
  }
}

// Keep process alive
setInterval(() => {}, 10000);
