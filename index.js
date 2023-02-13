const http = require ('http');
const members = require('./member');
const fs = require("fs");
const getUsers = require('./users');

const server = http.createServer( async (req, res)=> {
    if(req.url === '/'){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end("This is the home page");
    }
    
    else if (req.url === '/about') {
        const date = new Date().toISOString();
        const data = {
            status: 'success',
            Message : 'response success',
            Description: 'Exercise #03',
            Date : date,
            Data : members
        };
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(JSON.stringify(data));
    }

    else if (req.url === '/users'){
        const user = await getUsers();
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(JSON.stringify(user));
    }

    else{
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Not Found');
    }
});

const hostname = '127.0.0.1';
const port = 3000;
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});