SHELL := /bin/bash

.PHONY: help install ui dev build start lint

help:
	@echo "Available targets:"
	@echo "  make install  - install dependencies"
	@echo "  make ui       - run the UI in development mode"
	@echo "  make dev      - alias for make ui"
	@echo "  make build    - build the app"
	@echo "  make start    - start the production server"
	@echo "  make lint     - run lint checks"

install:
	npm install

ui:
	npm run dev

dev: ui

build:
	npm run build

start:
	python3 scripts/serve_static_export.py

lint:
	npm run lint
