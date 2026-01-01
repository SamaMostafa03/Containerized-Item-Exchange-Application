# Local Development Setup

This branch is for local development using Docker Compose.

## Quick Start

1. Start all services:
```bash
   cd jack-trades-main
   docker-compose up --build
```

2. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Database: localhost:5432

3. Make changes to your code - they'll hot reload automatically!

4. Stop services:
```bash
   docker-compose down
```

## Development Workflow

### Making Backend Changes
1. Edit files in `server/`
2. Backend automatically restarts (nodemon)
3. Test at http://localhost:8000

### Making Frontend Changes
1. Edit files in `client/src/`
2. Frontend automatically rebuilds
3. Browser auto-refreshes

### Reset Database
```bash
docker-compose down -v  # Removes volumes
docker-compose up
```

## Useful Commands
```bash
# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Restart a service
docker-compose restart backend

# Rebuild after dependency changes
docker-compose up --build

# Run migrations
docker-compose exec backend npm run migrate

# Access database
docker-compose exec postgres psql -U jackuser -d jack_trades_dev
```
