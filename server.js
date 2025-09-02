// server.js - Custom server to prevent Sharp loading
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Prevent Sharp from loading
process.env.SHARP_IGNORE_GLOBAL_LIBVIPS = '1';
process.env.NEXT_DISABLE_SHARP = '1';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3001, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3001');
  });
});
