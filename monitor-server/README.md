# Monitor Server

![Build Status](https://travis-ci.com/delisarsar/health-check-monitor.svg?branch=main)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)
[![codecov](https://codecov.io/gh/delisarsar/health-check-monitor/branch/main/graph/badge.svg?token=RHL8XYZ8AA)](https://codecov.io/gh/delisarsar/health-check-monitor)

GraphQL Server hosting the web application. It packages the front end app and serves it under 
`http://localhost:8080`

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

- Maven 3.6.3 or above
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

### Sample GraphQL Queries/Mutations

## Mutations

##Note: The URL must be a URL otherwise it would reject and throw an error

Create a new application with its health check
```
mutation {
  createApplication (
    name: "Jahia Cloud (Production)",
    endpoint: "https://jahia.com"
  )
}
```

Updates an existing application with its health check
```
mutation {
  updateApplication (
    name: "Jahia Cloud (Production EU)",
    endpoint: "https://jahia-eu.com",
    appId: 1
  )
}
```

Delete an existing application
```
mutation {
  deleteApplication(applicationId: 1)
}
```

## Queries
Get applications with a limit result set count
``` 
{
  getApplications(count: 10) {
    name,
    id,
    healthCheck {
      endpoint,
    }
  }
}
```

Get applications with a partial search on the name
``` 
{
  getApplicationsLikeName(name: "Jah") {
    id,
    name,
    healthCheck {
      endpoint,
    }
  }
}
```