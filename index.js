const fs = require('fs')
const path = require('path')
const http = require('http')


const createPath = (...arg) => path.join(__dirname, arg.join(',').replaceAll(',', '/'))




const server = http.createServer((req, res) => {
    if(req.url === '/' && req.method === "GET"){
        fs.promises.readFile(createPath('pages', 'index.html'), 'utf-8')
            .then((data) => {
                res.writeHead(200, {'content-type' : 'text/html'})
                res.write(data)
                res.end()
            })
            .catch((err) => {
                res.writeHead(404, {'content-type' : 'text/plain'})
                res.write(err)
                res.end()
            })
    }
    else if(req.url === '/api/users' && req.method === "GET"){
        fs.promises.readFile(createPath('db', 'users.json'), 'utf-8')
            .then((data) => {
                res.writeHead(200, {'content-type' : 'application/json'})
                res.write(data)
                res.end()
            })
            .catch((err) => {
                res.writeHead(404, {'content-type' : 'text/plain'})
                res.write(err)
                res.end()
            })
    }
    else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "GET") {
        const id = req.url.split('/')[3]
        console.log(id);
        res.end()
    }
    else{
        
    }
})

server.listen(3000, (err) => {
    if(err) {
        console.log(err);
    }else {
        console.log('server is Running');
    }
})