# CultureLive
## Sakila API - NestJS + PostgreSQL + CronJobs
Welcome to the Sakila API project, a REST API built with NestJS using the Sakila database in PostgreSQL, featuring scheduled tasks powered by @nestjs/schedule. The project is containerized and managed using Docker Compose for easy deployment and service orchestration.


## Project Overview
This project provides:
    A REST API to interact with the Sakila database, a popular sample database for learning relational database management systems.
    Endpoints to manage rentals, tasks, and customers.
    Automated tasks (CronJobs) for periodic data synchronization and reporting.


## Installation
1. Clone the repo.
```bash
    git clone https://github.com/PierreSaumet/CultureLive.git <NAME_FOLDER>
```

2. Go to your new folder
```bash
    cd <NAME_FOLDER>
```

3. Start services with Docker Compose
```bash
    docker compose build && docker compose up
```

**This will start:**

    PostgreSQL with the Sakila database
    The NestJS API, accessible on port 3000


## Project Structure

    culturelive
    ├── src
    │   ├── app.module.ts
    │   ├── app.controller.ts 
    │   ├── app.service.ts
    │   ├── customer
    │   │   ├── dto
    │   │   │   ├── create-customer.dto.ts
    │   │   │   └── update-customer.dto.ts
    │   │   ├── customer.controller.ts
    │   │   ├── customer.entity.ts
    │   │   ├── customer.module.ts
    │   │   ├── customer.service.ts
    │   ├── film
    │   │   ├── film.entity.ts
    │   │   ├── film.module.ts
    │   │   ├── film.service.ts
    │   ├── rental
    │   │   ├── dto
    │   │   │   ├── create-rental.dto.ts
    │   │   ├── rental.controller.ts
    │   │   ├── rental.entity.ts
    │   │   ├── rental.module.ts
    │   │   ├── rental.service.ts
    │   ├── task
    │   │   ├── task.controller.ts
    │   │   ├── film.module.ts
    │   │   ├── task.service.ts
    │   └── main.ts                
    docker-compose.yml
    README.md    


## Available Endpoints
**Example REST API Endpoints:**

    POST /customers : Add a new customer
    PUT /customers/:id : Update customer information
    POST /rental : Add a new rental
    GET /task : Returns informations about the current tasks.
    GET /task/:name : Get information for a task (cron)
    POST /task/:cronName : Start the task with the given cronName


## Usage
**Access the API**

Once the container is running, the API will be accessible at:
http://localhost:3000