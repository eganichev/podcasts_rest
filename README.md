## Getting Started

You must have docker compose on your machine, run the following command to start project:

```bash
#to build containers
docker compose build
# to run containers
docker compose up
# to stop containers
docker compose down
# or
```

About .env files\
On server .env file contains
```
PORT=3001
API_URL=https://601f1754b5a0e9001706a292.mockapi.io
LIMITER_WINDOWMS=900000
LIMITER_LIMIT=100
```

Open [http://localhost:3000](http://localhost:3000) with your browser to use rest api.

Or\
Open [http://localhost:3000/graph](http://localhost:3000) with your browser to use GraphQL.

You can start modifying `LIMITER_WINDOWMS` and `LIMITER_LIMIT` to change requests limit to server.

- [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit) - more about limit props.

On client .env file contains
```
NEXT_PUBLIC_REST_HOST=http://localhost:3001
NEXT_PUBLIC_GQL_HOST=http://localhost:3001/graphql
```
