const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  proxy.web(req, res, { target: 'http://localhost:3000', changeOrigin: true }, (err) => {
    res.writeHead(502);
    res.end('Bad Gateway');
  });
});

server.listen(3001, '0.0.0.0', () => {
  console.log('Proxy running on port 3001 -> 3000');
});
