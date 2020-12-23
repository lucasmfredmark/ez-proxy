const http = require('http')
const httpProxy = require('http-proxy')
const { pathToRegexp } = require('path-to-regexp')
const config = require('./config')

const proxy = httpProxy.createProxyServer()

const server = http.createServer((req, res) => {
    for (const [i, route] of Object.entries(config)) {
        if (pathToRegexp(route.path, null, { end: false }).exec(req.url)) {
            return proxy.web(req, res, {
                target: route.target + req.url.replace(route.path, ''),
                changeOrigin: true,
                ignorePath: true,
                headers: {
                    'User-Agent': 'ez-proxy/1',
                    ...(route.headers || {})
                }
            })
        }
    }

    res.writeHead(501, { 'Content-Type': 'text/plain' })
    res.end('Proxy error: Path not matched')
})

server.listen(process.env.PORT || 80)
