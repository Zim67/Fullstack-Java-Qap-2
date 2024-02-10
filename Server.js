const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// Function to serve HTML files
function serveHtmlPage(res, filePath) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.log(`File not found: ${filePath}`);
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>Page not found</h1>');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(content, 'utf-8');
  });
}

const server = http.createServer((req, res) => {
    // Use the url module to parse the request URL
    const parsedUrl = url.parse(req.url, true);
  
    // Normalize the path and remove leading slash
    let path = parsedUrl.pathname;
    path = path.replace(/^\/+|\/+$/g, '');
    
    // Determine the file path based on the route
    let filePath = 'views/home.html'; // Default to home page
    switch (path) {
      case 'about':
        filePath = 'views/about.html';
        break;
      case 'contact':
        filePath = 'views/contact.html';
        break;
      case 'products':
        filePath = 'views/products.html';
        break;
      case 'subscribe':
        filePath = 'views/subscribe.html';
        break;
      case 'locations':
        filePath = 'views/locations.html';
        break;
      case 'ourstaff':
        filePath = 'views/ourstaff.html';
        break;
      case 'login':
        filePath = 'views/login.html';
        break;
      case 'register':
        filePath = 'views/register.html';
        break;
      // For home or any other unhandled route, serve the home page or a 404 page
      case '':
      case 'home':
        filePath = 'views/home.html';
        break;
      default:
        filePath = ''; // Set to empty to trigger 404 later
    }
    
    // Serve the HTML file if filePath was set; otherwise, serve a 404 page
    if (filePath) {
      serveHtmlPage(res, filePath);
    } else {
      console.log('Page not found:', path);
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>Page not found</h1>');
    }
});

// Set the port to listen on
const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
