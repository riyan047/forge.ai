#!/bin/bash

# This script runs during sandbox startup to ensure Next.js is ready before use.

function ping_server() {
    counter=0
    while true; do
        response=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000")
        if [[ "$response" == "200" ]]; then
            echo "✅ Next.js server is up!"
            break
        fi

        if (( counter % 20 == 0 )); then
            echo "⏳ Waiting for server to start..."
        fi

        counter=$((counter + 1))
        sleep 0.2
    done
}

# Start pinging in background
ping_server &

# Move to project root
cd /home/user

# Start dev server (Turbopack)
echo "🚀 Starting Next.js with Turbopack..."
exec npx next dev --turbo --port 3000
