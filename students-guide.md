# Students Guide: Deploying with Docker Swarm on EC2

This guide walks through deploying the Docker Volumes App using Docker Swarm on an Amazon EC2 instance.

## Prerequisites
- EC2 instance with Docker engine installed
- Security group allows inbound traffic on ports **8080** and **3000**
- If you plan to run a multi-node swarm, a Docker registry such as Docker Hub

## Steps
1. **Connect to the EC2 instance**
   ```sh
   ssh ec2-user@<EC2_PUBLIC_IP>
   ```
2. **Initialize Docker Swarm**
   ```sh
   sudo docker swarm init --advertise-addr <EC2_PUBLIC_IP>
   ```
   Copy the join token if you will add worker nodes later.

3. **Clone this repository and build the images**
   ```sh
   git clone https://github.com/.../Docker-volumes-app.git
   cd Docker-volumes-app
   sudo docker build -t volumebackend:latest backend
   sudo docker build -t volumefrontend:latest frontend
   ```
   If running a multi-node swarm, push these images to a registry accessible by all nodes.

4. **Deploy the stack**
   ```sh
   sudo docker stack deploy -c docker-stack.yml volumeapp
   ```

5. **Verify services**
   ```sh
   sudo docker stack services volumeapp
   sudo docker service ls
   ```

6. **Access the application**
   - Frontend: `http://<EC2_PUBLIC_IP>:8080`
   - Backend API: `http://<EC2_PUBLIC_IP>:3000`

7. **Clean up**
   ```sh
   sudo docker stack rm volumeapp
   ```
   Optional: `sudo docker volume ls` to inspect persistent volumes.

## Notes
- The stack file `docker-stack.yml` uses Docker named volumes to persist contact submissions.
- For multi-node swarms, ensure volumes reside on nodes where services run or use a network storage driver.
