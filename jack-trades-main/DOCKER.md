# Jack of All Trades - Docker Setup Guide

## Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Git

### Environment Setup

Create a `.env` file in the project root:

```env
# Database
DB_USER=jackuser
DB_PASSWORD=jackpass
DB_NAME=jack_trades_dev

# Node Environment
NODE_ENV=development
PORT=8000

# JWT Secret
SECRET_TOKEN=your-super-secret-key-change-this-in-production

# Frontend
JACK_TRADES=http://localhost:3000
```

### Running the Application

1. **Start all services:**
```bash
docker-compose up -d
```

2. **Seed the database (if needed):**
```bash
docker-compose exec backend npm run db:seed
```

3. **Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api/v1
- Database: localhost:5432

### Useful Commands

```bash
# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Stop services
docker-compose down

# Stop and remove volumes (careful - deletes data)
docker-compose down -v

# Rebuild containers
docker-compose build --no-cache

# Execute commands in containers
docker-compose exec backend npm run lint
docker-compose exec backend npm run test
```

## Architecture

### Services

1. **PostgreSQL Database**
   - Container: `jack-trades-db`
   - Port: 5432
   - Volume: `postgres_data` (persistent)
   - Health checks enabled

2. **Node.js Backend**
   - Container: `jack-trades-backend`
   - Port: 8000
   - Built with multi-stage Docker build for optimization
   - Serves both API and built React app in production mode

3. **React Frontend (Development)**
   - Container: `jack-trades-frontend-dev`
   - Port: 3000
   - Hot-reload enabled with volume mounts
   - Proxies API calls to backend

## Production Deployment

For production, you can use the built Docker image from the Dockerfile:

```bash
docker build -t jack-trades:latest .
docker run -p 8000:8000 --env-file .env.production jack-trades:latest
```

The Dockerfile uses a multi-stage build:
- **Stage 1 (Builder):** Compiles TypeScript backend and builds React frontend
- **Stage 2 (Production):** Minimal runtime image with only production dependencies

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is healthy: `docker-compose ps`
- Check logs: `docker-compose logs postgres`
- Verify DATABASE_URL format matches: `postgres://user:pass@host:port/db`

### Frontend Not Loading
- Clear browser cache and restart frontend service
- Check frontend logs: `docker-compose logs frontend`
- Ensure backend is running: `docker-compose logs backend`

### Port Already in Use
Change the port mappings in `docker-compose.yml`:
```yaml
ports:
  - "8001:8000"  # Backend on 8001
  - "3001:3000"  # Frontend on 3001
```

## Development vs Production

**Development** (current setup):
- Frontend runs with hot-reload
- Volume mounts for live code changes
- Environment: NODE_ENV=development

**Production**:
- Single optimized container
- Pre-built frontend and backend
- Environment: NODE_ENV=production
- Frontend served from Express static files

