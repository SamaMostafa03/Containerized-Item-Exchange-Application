# Containerized-Item-Exchange-Application# Problem:
- People sometimes struggle with having piled up things that they can't throw away because they have value, but they can't find someone/place they can sell/donate to.
- Implementing a complete DevOps pipeline for an item exchange application focusing on containerization, automation, and observability.
# Solution:
- We created a website similar to e-commerce websites. however seeling products in not its purpose. In our website people can join to exchnage their items with others', or they can post items for free, no exhnages needed. Here the user can post an item and if someone is interested in taking it, they have to give back one in return.

# User Stories:
- As a user, I can join the website using google/facebook account.
- I can post about the items that I either want to offer for an echange, or want to donate.
- I can browse what others have posted.
- I can request a certain item.
- I can get requests for the items I posted.
- I can either accept or decline the requests I get.
- I can pick an item from the user who requested from me, in exchange.
- I can see my requests and favorites from my profile page.
- I can recieve request notifications.

# User Journey:
If you want to request something:
- When the user enters the website he will first see the landing page, that contains an introduction about the website.
- When he clicks on join us button, he will be moved into signup page, where he can signup with google, facebook or create his own account.
- Then he can request a cetrain item, or post a new item for donation or exchange.
- When he requests an item, the user who posted an item will be notified, and will be able to either accept or decline the request.
- If the user who got the notification is interested in the offer, he can visit the sender's profile and pick a certain item in exchange. Otherwise he can decline the request.
- If the reciever picks an item, the sender will be notified in return about the exchange, where he will also need to either accept or decline.
- The exchange will be marked as successful when both parties accept each other's requests. Otherwise, no one gets anything.

If you want to post something:
- The user can go to his profile, where he will find all the items he posted.
- He can delete or edit any of his posts . 
- He will find an 'add item' button,when clicked a popup will appear where he can add the details about the new item and post it.

## **Prototype**

[View Prototype](https://www.figma.com/file/fPQZSpIJOamNJ9FMTg59x0/PWA-eCommerce-Theme-(Community)?node-id=184%3A0)

------------------------
![dentoro](https://i.imgur.com/E8s1cPE.png)

## **Environment variables**
Environment variables are one of the ways we keep our product safe. If you want to access our app locally you will need to add your own.
- create .env file
- add your Environment variables
```sh
DEV_DB_URL= # Your development PostgreSQL connect
TEST_DB_URL = # Your test PostgreSQL connect
DATABASE_URL= # Your production PostgreSQL connect
SECRET_TOKEN= # Your token Secret key
JACK_TRADES: #react localhost
```

## **Docker & Development**

If you want to run the full application with Docker (recommended for consistent local development), the repository includes a `docker-compose.yml` that starts PostgreSQL, the backend and the frontend in development mode.

- **Create a `.env` file** in the project root (example):

```env
# Database
DB_USER=jackuser
DB_PASSWORD=jackpass
DB_NAME=jack_trades_dev

# Node
NODE_ENV=development
PORT=8000

# JWT secret
SECRET_TOKEN=your-super-secret-key

# Frontend URL
JACK_TRADES=http://localhost:3000
```

- **Quick start (development)**:

```bash
cd jack-trades-main
docker-compose down -v        # stop and remove containers + volumes (clean start)
docker-compose build --no-cache
docker-compose up -d         # start services in background
docker-compose logs -f       # follow logs
```

- **Seed the database** (after services are up):

```bash
docker-compose exec backend npm run db:seed
```

- **Useful docker-compose commands**:

```bash
# Show running containers
docker-compose ps

# View logs for a specific service
docker-compose logs -f backend

# Stop and remove containers/networks (keep volumes)
docker-compose down

# Stop and remove containers + volumes (data erased)
docker-compose down -v

# Rebuild images
docker-compose build --no-cache
```

### Development workflow notes

- The `docker-compose.yml` mounts the local `client` and `server` folders into the frontend and backend containers respectively. That means:
	- Editing frontend files in `client/` triggers React dev server hot-reload.
	- Editing backend TypeScript files in `server/` will be picked up by `ts-node-dev` (watch/restart) inside the backend container.

- If you change dependencies (`package.json`), restart the affected service so `npm install` runs inside the container.

### Troubleshooting

- If PostgreSQL logs show `FATAL: database \"jackuser\" does not exist`, ensure you started with a clean volume so the init script can create the databases:

```bash
docker-compose down -v
docker-compose up -d
docker-compose logs -f postgres
```

- If `react-scripts` or other packages are missing inside the frontend container, run:

```bash
docker-compose exec frontend npm install
```

- To inspect container state or run a shell inside a service:

```bash
docker-compose exec backend sh
docker-compose exec frontend sh
```

## **Seeding Data (local & Docker)**

The project includes a seeding script at `server/database/build.ts`. There are npm scripts that run it with the `SEED` flag so the database is populated with sample data for development and testing.

1) Local (no Docker)

 - Install dependencies and create your `.env` with a valid `DEV_DB_URL` pointing to your local PostgreSQL instance.

```bash
cd jack-trades-main
npm ci
# ensure .env contains a valid DEV_DB_URL, e.g.: DEV_DB_URL=postgres://jackuser:jackpass@localhost:5432/jack_trades_dev
npm run db:seed
```

The `db:seed` script runs: `cross-env SEED=true NODE_ENV=development ts-node server/database/build.ts` and will insert seed data into the development database.

To seed the test database (explicitly) you can run:

```bash
# with cross-env available via npx
npx cross-env SEED=true NODE_ENV=test ts-node server/database/build.ts
```

2) With Docker Compose

 - Start services (if not already running):

```bash
cd jack-trades-main
docker-compose up -d
```

 - Run the seed script inside the backend container:

```bash
docker-compose exec backend npm run db:seed
# or, if backend isn't running, run one-off:
docker-compose run --rm backend npm run db:seed
```

If you run the seeder directly with `ts-node` inside the container (you used this locally), these commands work as well:

```bash
# run with npx ts-node inside the backend container
docker compose exec backend npx ts-node server/database/build.ts

# set SEED env inline and run
docker compose exec backend sh -c "SEED=true npx ts-node server/database/build.ts"
```

If you've moved/compiled the seeder to an `out` or `dist` directory (compiled JS), run the compiled script with `node` instead of `ts-node` and adjust the path, for example:

```bash
# example when seeder compiled to server/dist/database/build.js
docker compose exec backend node server/dist/database/build.js
```

3) Production seeding

There is a `db:seed:production` script that runs the same seeder with `NODE_ENV=production`:

```bash
npm run db:seed:production
```

Notes:
- The seeder respects the `NODE_ENV` to select the appropriate DB URL from `server/database/connection.ts` (DEV/TEST/PROD).
- When using Docker, the included `init-db.sh` will create the three databases on first postgres startup; if you need that script to run again, remove the postgres volume and recreate containers (`docker-compose down -v`).
- If seeding fails with connection errors, verify your `.env` values and that Postgres is accepting connections.


## **Database Setup**

make sure you have installed PostgreSQL and pgcli 

```sql=
CREATE DATABASE {database name};
CREATE USER {user name} WITH superuser password {password}
ALTER DATABASE {database name} OWNER TO {user name};
```
- Test DB:
- Do the same as before but make sure to change the names.

` Run the following command in the terminal  `npm run db:seed` `

## **Technologies**
- Nodejs
- Express
- Socket.io
- Sequalize
- React
- Postgres
- MaterialUI

## **Lead Mentor**

- [Muhammad Abdulhadi](https://github.com/Mu7ammadAbed)

## **Team Members**

- [Sara Dahman](https://github.com/SaraDahman)
- [Mohammed Balousha](https://github.com/MohammedOmar123)
- [Abdalhakim Abumusameh](https://github.com/hkmusameh01)