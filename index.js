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
        fs.promises.readFile(createPath('db', 'users.json'), 'utf-8')
            .then((data) => {
                const users = JSON.parse(data);
                const user = users.find((u) => u.id === +id)
                if(user){
                    res.writeHead(200, {'content-type' : 'application/json'})
                    res.write(JSON.stringify(user))
                    res.end()
                }else {
                    res.writeHead(404, {'content-type' : 'text/plain'})
                    res.write(`${id} - id user not found`)
                    res.end()
                }
            })

        
    }
    else if(req.url.includes('?') && req.method === "GET"){
        
        const searchIndex = req.url.indexOf('?')
        const queryParams = req.url.slice(searchIndex + 1).split('=')[1]
        fs.promises.readFile(createPath('db', 'users.json'), 'utf-8')
            .then((data) => {
                
                const users = JSON.parse(data)
                const newUsers = users.filter((u) => u.name.toLowerCase().indexOf(queryParams.toLowerCase()) > -1)
                res.writeHead(200, {'content-type' : 'application/json'})
                res.write(JSON.stringify(newUsers))
                res.end()
            })
    }
    else if(req.url === '/api/users' && req.method === "POST") {
        let body = [];

        req.on('data', chunk => body.push(chunk));
        
        req.on('end', () => {
            body = JSON.parse(body[0].toString());
            console.log(body); // the actual data
        })

        console.log(body);
        
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