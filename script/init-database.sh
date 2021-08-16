set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER thaivivath_admin;
    CREATE DATABASE parking;
    GRANT ALL PRIVILEGES ON DATABASE parking TO parking;
EOSQL