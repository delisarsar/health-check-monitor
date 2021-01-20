# Monitor Server

![Build Status](https://travis-ci.com/flexudy/flexudy-gateway.svg?token=mkEY3vWKpsKgXs8jzWKp&branch=master)
[![codecov](https://codecov.io/gh/flexudy/flexudy-gateway/branch/master/graph/badge.svg?token=PSG835WNZ0)](https://codecov.io/gh/flexudy/flexudy-gateway)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

GraphQL Server hosting the web application. It packages the front end app and serves 

## Installation

```
    mvn clean install
```

## Running the application locally

```
    mvn clean spring-boot:run
```

### Building the Docker Image

```
    docker build -t com.devops.tools/monitor-app:1.0 .

```

### Requirements

- Java 1.11 or later

## Development

To run the tests:

```sh
mvn test
```

### GraphQL
In order to view the available GraphQL operations refer to:

http://localhost:8080/graphiql

### Web Application
The web app is available under http://localhost:8080


The library uses [Project Lombok][lombok]. While it is not a requirement, you
might want to install a [plugin][lombok-plugins] for your favorite IDE to
facilitate development.

[lombok]: https://projectlombok.org
[lombok-plugins]: https://projectlombok.org/setup/overview
