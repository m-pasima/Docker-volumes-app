# Docker Volume Practice App

This sample project demonstrates Docker named volumes and Kubernetes persistent volumes using a simple full-stack web application for a fictional digital consultancy.

## Project Overview
- **Frontend:** Static site served by Nginx with Tailwind CSS.
- **Backend:** Node.js Express API storing contact form submissions to `/data/contacts.json`.
- **Persistence:** Docker named volumes and Kubernetes PV/PVC keep contact data across container restarts.

## Docker Usage
1. Build and start containers:
   ```sh
   docker-compose up --build
   ```
2. Visit the site at <http://localhost:8080> and submit the contact form.
3. Inspect the created volume:
   ```sh
   docker volume inspect docker-volumes-app_contact_data
   ```
   The file `contacts.json` is stored inside this volume.

## Kubernetes Usage
1. Build images:
   ```sh
   docker build -t frontend:latest frontend
   docker build -t backend:latest backend
   ```
2. Apply manifests:
   ```sh
   kubectl apply -f k8s/
   ```
3. Access the frontend via the NodePort service on port `30080`.

## Docker vs Kubernetes Volumes
- **Docker named volumes** are managed by the Docker engine and can be inspected with `docker volume ls`.
- **Kubernetes PersistentVolumes** abstract the storage layer and are bound to PersistentVolumeClaims used by pods.

## Cleaning Up
- Docker Compose: `docker-compose down`
- Kubernetes: `kubectl delete -f k8s/`

## License
This project uses royalty-free images from Unsplash.
