#!/bin/bash

if [ $# -lt 1 ]; then
    echo "You kan start with eny of the number of inputs"
    echo "db"
    echo "backend"
    echo "frontend"
    exit 1
fi

input=$1

case $input in
    "db")
        docker run --name postgresql -p 5432:5432 -e POSTGRESQL_USERNAME=my_user -e POSTGRESQL_PASSWORD=password123 -e POSTGRESQL_DATABASE=rental bitnami/postgresql:latest
        ;;
    "backend")
        ./mvnw spring-boot:run
        ;;
    "frontend")
        npm start
        ;;
    *)
        echo "wrong start varibal: $input"
        exit 1
        ;;
esac

exit 0
