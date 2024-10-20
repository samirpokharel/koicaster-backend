# Makefile for managing Koicaster Backend with Doppler and Docker Compose

.PHONY: up build down prod-up prod-build prod-up-build

# Command to start the application without rebuilding
up:
	doppler run -- docker-compose up

# Command to build the application
build:
	doppler run -- docker-compose build

# Command to build and start the application
up-build:
	doppler run -- docker-compose up --build

# Command to start the production application without rebuilding
prod-up:
	doppler run -- docker-compose -f docker-compose.prod.yml up

# Command to build the production application
prod-build:
	doppler run -- docker-compose -f docker-compose.prod.yml build

# Command to build and start the production application
prod-up-build:
	doppler run -- docker-compose -f docker-compose.prod.yml up --build

# Command to stop the application
down:
	docker-compose down
