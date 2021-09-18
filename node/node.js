const http = require("http")
const app = http.createServer((req, res) => {
    const { method, url, header: { cookie } } = req
    if (method === "GET" && url === "/api/user1") { // 简单跨域请求
        res.setHeader('Access-Control-Allow-Origin', "http://hagan.com:8080")
        res.end(JSON.stringify([{ name: "hagan", age: 22 }]))
    }

    if (method === 'OPTIONS' && url === '/api/user2') { // 复杂跨域请求
        res.statusCode = 200
        res.setHeader('Access-Control-Allow-Origin', 'http://hagan.com:8080') // 可通过预检请求的域名
        res.setHeader('Access-Control-Allow-Headers', 'Hagan-Token,Content-Type') // 可通过预检请求的Headers
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST') // 可通过预检请求的Method
        res.end()
    }
    if (method === 'GET' && url === '/api/user2') { // 复杂跨域请求
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', 'http://hagan.com:8080')
        res.setHeader('Set-Cookie', 'name=hagan')
        res.end(JSON.stringify([{ name: 'hagan', age: 22 }]))
    }
    if (method === 'GET' && url === '/api/user3') { // 跨域请求携带Cookie
        res.setHeader('Access-Control-Allow-Origin', 'http://hagan.com:8080')
        res.setHeader('Access-Control-Allow-Credentials', true)
        res.end(JSON.stringify([{ name: 'hagan', age: 22 }]))
    }
})

app.listen(3000, () => {
    console.log("listen 3000");
})


// 反向代理
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

app.use(express.static(__dirname + '/'))
app.use('/api', createProxyMiddleware({ target: 'http://hagan.com:3000' }))
app.listen(8080)