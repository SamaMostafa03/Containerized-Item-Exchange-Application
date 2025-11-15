#!/bin/bash
set -e

# Create additional databases
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE jack_trades_test;
    CREATE DATABASE jack_trades_prod;
EOSQL

echo "Additional databases created successfully!"
