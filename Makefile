# Load environment variables from .env file
include .env
export $(shell sed 's/=.*//' .env)

MIGRATE_CMD = migrate -path $(MIGRATIONS_DIR) -database $(DATABASE_URL)
DATABASE_URL = "mysql://$(MYSQL_USER):$(MYSQL_PASSWORD)@tcp($(MYSQL_HOST):$(MYSQL_PORT))/$(MYSQL_DATABASE)"
MIGRATIONS_DIR = migrations

.PHONY: migrate-up migrate-down migrate-create docker-up docker-down mysql-up mysql-down setup cleanup

# Run migrations up
migrate-up:
	$(MIGRATE_CMD) up

# Run migrations down
migrate-down:
	$(MIGRATE_CMD) down 1

# Create a new migration
migrate-create:
ifndef NAME
	$(error NAME is undefined. Usage: make migrate-create NAME=<migration_name>)
endif
	migrate create -ext sql -dir $(MIGRATIONS_DIR) -seq $(NAME)

# Start MySQL Docker container
mysql-up:
	docker run --name mysql-container \
	-e MYSQL_ROOT_PASSWORD=$(MYSQL_PASSWORD) \
	-e MYSQL_DATABASE=$(MYSQL_DATABASE) \
	-p $(MYSQL_PORT):$(MYSQL_PORT) \
	-d mysql:latest

# Stop and remove MySQL Docker container
mysql-down:
	docker stop mysql-container
	docker rm mysql-container

setup:
	make mysql-up
	@echo "Waiting for MySQL to be ready..."
	@while ! docker exec mysql-container mysql -uroot -proot -e "select 1"; do \
		echo "MySQL is not ready yet..."; \
		sleep 1; \
	done
	@echo "MySQL is ready!"
	make migrate-up
	npm i --save

start:
	node app.js

cleanup:
	make mysql-down