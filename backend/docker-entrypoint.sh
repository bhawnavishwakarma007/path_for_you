#!/bin/sh

echo "Waiting for database..."

until mysqladmin ping \
    -h "$DBHOST" \
    -u "$DBUSER" \
    -p"$DBPASS" \
    --silent
do
    echo "Database not ready..."
    sleep 5
done

echo "Database is available."

echo "Checking database..."

mysql \
-h "$DBHOST" \
-u "$DBUSER" \
-p"$DBPASS" \
-e "CREATE DATABASE IF NOT EXISTS \`$DBNAME\`;"

TABLE_COUNT=$(mysql \
-h "$DBHOST" \
-u "$DBUSER" \
-p"$DBPASS" \
-D "$DBNAME" \
-Nse "SHOW TABLES;" | wc -l)

if [ "$TABLE_COUNT" -eq 0 ]; then
    echo "Importing database..."

    mysql \
    -h "$DBHOST" \
    -u "$DBUSER" \
    -p"$DBPASS" \
    "$DBNAME" < /app/path_for_you.sql

    echo "Database imported."
else
    echo "Database already initialized."
fi

echo "Starting application..."

exec "$@"
