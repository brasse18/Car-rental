# Car Rental

This project is based on the minimal bootstrap project [here](https://github.com/noxreview/bootstrap-project). It utilizes Maven, Java 17, Docker, Node 16 LTS, and NPM.

## Getting Started

### 1. Set up the Database

Start a PostgreSQL database using the Bitnami PostgreSQL image:

```bash
docker run --name postgresql -p 5432:5432 \
  -e POSTGRESQL_USERNAME=my_user \
  -e POSTGRESQL_PASSWORD=password123 \
  -e POSTGRESQL_DATABASE=rental \
  bitnami/postgresql:latest
```

After starting the database, populate it with initial tables and data:

```bash
psql -h localhost -U my_user -d rental -a -f init_tables.sql
psql -h localhost -U my_user -d rental -a -f insert.sql
```

### 2. Start the Backend

The backend, built with [Spring Initializr](https://start.spring.io/), connects to the PostgreSQL database.

Run the following command to start the backend:

```bash
./mvnw spring-boot:run
```

### 3. Start the Frontend

The frontend, bootstrapped with [Create React App](https://github.com/facebook/create-react-app), communicates with the backend hosted at `http://localhost:8080`.

To start the frontend, navigate to the `frontend` folder and run:

```bash
npm install
npm start
```

### 4. Alternatively, Use Bash Scripts

For convenience, bash scripts are provided to start each component:

#### 4.1 Start the Database

```bash
bash .run.sh db
```

#### 4.2 Start the Backend

```bash
bash .run.sh backend
```

#### 4.3 Start the Frontend

```bash
bash .run.sh frontend
```

