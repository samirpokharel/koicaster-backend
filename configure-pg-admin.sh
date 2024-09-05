#!/bin/bash
source .env

echo '
{
    "Servers": {
        "1": {
            "Name": "My Cool Server",
            "Group": "Server Group 1",
            "Port": 5432,
            "Username": "'"$DEV_POSTGRES_USER"'",
            "Host": "db",
            "SSLMode": "prefer",
            "MaintenanceDB": "postgres",
            "Password": "'"$DEV_POSTGRES_PASSWORD"'"
        }
    }
}
' > servers.json

