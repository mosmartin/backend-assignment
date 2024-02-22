## Env Prerequisites
- MongoDB
- Node.js 
- Docker (if you want to run via docker)
- Create a `.env` file based off `.env.example`

### Scrape Fees Collected

    npm run scraper

### Start web server
    npm start

### REST endpoint that allows retrieval of all collected events for a given integrator
    GET: /api/v1/events/:integrator


## With Docker

#### To start the application

Step 1: Create docker network

    docker network create backend-network

Step 2: start mongodb 

    docker run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password --name mongodb --net backend-network mongo 

Step 3: Build the backend
    
    docker build -t backend .

Step 4: Run the backend

      docker run --rm --name backend -p 3000:3000 --network backend-network backend

_NOTE: creating docker-network in optional. You can start both containers in a default network. In this case, just emit `--net` flag in `docker run` command_

## With Docker Compose

#### To start the application

Step 1: start mongodb and mongo-express

    docker compose up --build
    
_You can access the API under localhost:3000_
    
Step 2: Endpoint base url

    http://localhost:3000/api/v1/
    
