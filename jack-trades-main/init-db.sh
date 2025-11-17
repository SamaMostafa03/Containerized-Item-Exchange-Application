#!/bin/bash
set -e

# Create additional databases


# Grant privileges to the user
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE jack_trades_test;
    CREATE DATABASE jack_trades_prod;
    GRANT ALL PRIVILEGES ON DATABASE jack_trades_test TO $POSTGRES_USER;
    GRANT ALL PRIVILEGES ON DATABASE jack_trades_prod TO $POSTGRES_USER;
EOSQL

echo "Additional databases created successfully!"
