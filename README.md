# ez-proxy

A very simple configurable HTTP proxy.

Useful as a middleware proxy for authentication.

## Usage

```sh
git clone https://github.com/lucasmfredmark/ez-proxy.git
cd ez-proxy
cp config.example.json config.json
docker build -t ez-proxy .
docker run -d -p 8080:80 --name ez-proxy ez-proxy
```

Requests to `http://localhost:8080/github` will now be proxied to `https://api.github.com`.

Custom HTTP headers can be set and will be merged with headers set in the route configuration.

### Configuration file example

Supported keys are `path`, `target` and `headers` (optional).

```json
[
    {
        "path": "/github",
        "target": "https://api.github.com",
        "headers": {
            "Authorization": "Basic dXNlcm5hbWU6cGFzc3dvcmQ="
        }
    },
    {
        "path": "/unsplash",
        "target": "https://api.unsplash.com",
        "headers": {
            "Authorization": "Client-ID A8Ap4Yv_Cyl1ZyF6BZhKv-Pw6JJsYUyhg4YmsBolYjA"
        }
    }
]
```
