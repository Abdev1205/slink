

# URL Shortener Service

This project provides a URL shortening service with a scalable architecture using Docker, Redis, and Nginx for load balancing. The services can generate shortened URLs, handle redirections, and ensure smooth traffic routing.



---

## Features

- **URL Shortening**: Allows users to shorten long URLs into a simple, easy-to-share format.
- **Redirection Service**: Redirects users from shortened URLs to the original long URL.
- **Redis Caching**: Uses Redis to cache data and improve response times.
- **Scalable Architecture**: Can easily scale to meet high traffic demands.
- **Nginx Proxy**: Acts as a reverse proxy to handle and route traffic between services efficiently.
- **Health Check**: Health endpoint (`/healthz`) to monitor the service's status.
- **Security Features**: Uses secure headers and secrets (JWT, Google OAuth, etc.).

---

## Project Architecture

This project is split into three services:

1. **Redis**: For caching the shortened URLs and enhancing performance.
2. **URL Shortener Service**: Responsible for generating the shortened URLs and handling requests.
3. **URL Redirection Service**: Responsible for redirecting the users to the original URLs when accessing a shortened URL.
4. **Nginx**: Acts as a reverse proxy to distribute the traffic between the services.

### Architecture Overview:

![image](https://github.com/user-attachments/assets/fdd51ae0-51f0-4af1-93e0-7b29215a019e)


- **Nginx**: The entry point for user requests. Nginx routes `/api/shorten` requests to the URL shortener and `/api/redirect` requests to the URL redirection service. 
- **Redis**: Redis acts as an intermediary data store, caching the shortened URLs to boost speed and reduce the need for repeated database calls.

---

## Technologies Used

- **Docker**: Used for containerizing the services.
- **Nginx**: As a reverse proxy for load balancing and traffic routing.
- **Redis**: To store and cache shortened URLs.
- **OAuth (Google)**: For user authentication and security.
- **JWT**: Secure authentication and authorization.

---

## Getting Started

### Prerequisites

- Docker installed on your machine.
- Docker Compose installed.
- Environment variables set up in a `.env` file:

    ```bash
    REDIS_URL=<Your Redis URL>
    DATABASE_URL=<Your Database URL>
    FRONTEND_URL=<Your Frontend URL>
    GOOGLE_CLIENT_ID=<Google OAuth Client ID>
    GOOGLE_CLIENT_SECRET=<Google OAuth Client Secret>
    GOOGLE_CALLBACK_URL=<Google OAuth Callback URL>
    JWT_SECRET_KEY=<Secret key for JWT>
    SESSION_SECRET=<Secret key for sessions>
    GUEST_ID=<Guest ID>
    ```

### Running the Project

To run the project, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/Abdev1205/slink.git
    cd url-shortener
    ```

2. Build and start the services using Docker Compose:

    ```bash
    docker-compose up --build
    ```

3. The services will start in the following order:
    - Redis
    - URL Shortener Service
    - URL Redirection Service
    - Nginx

4. Once the containers are running:
    - Access the URL shortening API at `http://localhost/api/shorten`.
    - Access the redirection service at `http://localhost/api/redirect`.

5. To check the health of the services:

    ```bash
    curl http://localhost/healthz
    ```

---

## Best Practices Followed

1. **Separation of Concerns**: Different services handle distinct tasks (shortening URLs, redirecting, caching).
2. **Environment Variables**: All sensitive configurations such as database URLs, JWT secrets, and OAuth credentials are managed through environment variables.
3. **Caching with Redis**: Caching the shortened URLs in Redis improves performance by reducing repeated database lookups.
4. **Dockerized Services**: Each service is containerized, allowing for easy scaling and management of the services.
5. **Security Best Practices**:
   - Secure headers in Nginx.
   - Use of HTTPS for proxies with `proxy_ssl_protocols` to secure data transmission.
6. **Nginx Debug Logs**: Debug-level logging enabled for Nginx to easily track issues during development.
7. **Health Check Endpoint**: Provides a simple `/healthz` endpoint for monitoring and automated health checks.
8. **CI/CD Friendly**: Designed for seamless integration with CI/CD pipelines using Docker.

---

## Demo

   ![image](https://github.com/user-attachments/assets/a2d759dd-eaf6-4e4b-9ecb-5a6752338395)

![image](https://github.com/user-attachments/assets/ef5883a6-8c60-4ec8-8b26-6041f8db1760)

![image](https://github.com/user-attachments/assets/6426580d-e898-4134-8976-9d7ac923ba75)

![image](https://github.com/user-attachments/assets/56567c75-2d21-4214-8184-62f7744d7cea)

![image](https://github.com/user-attachments/assets/1861e41d-8303-4e3b-b259-bfcba4b7b05a)

![image](https://github.com/user-attachments/assets/1958ca6d-0ca2-4a0f-afe3-01a92a4b9274)

![image](https://github.com/user-attachments/assets/a94e6033-cc6d-45d6-819c-a7b954d327dd)

![image](https://github.com/user-attachments/assets/60f75a21-6644-4542-8380-8935e99b2aa8)

![image](https://github.com/user-attachments/assets/d2117969-7cec-46e0-a9a2-af312d254f66)

![image](https://github.com/user-attachments/assets/37733216-de18-467b-98bb-ef57fe54ea5a)

![image](https://github.com/user-attachments/assets/60459805-b248-4d5e-b368-5f660878ce0f)

