#!/bin/bash
set -e

# Este script solo se ejecuta si la DB no existe aún
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE TABLE IF NOT EXISTS test_table (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
EOSQL
