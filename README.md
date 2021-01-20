# Health Check Monitor

![Build Status](https://travis-ci.com/delisarsar/health-check-monitor.svg?branch=main)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)
![codecov]([codecov](https://codecov.io/gh/delisarsar/health-check-monitor/branch/main/graph/badge.svg?token=RHL8XYZ8AA)](https://codecov.io/gh/delisarsar/health-check-monitor))

[Live Demo](https://jahia.flexudy.com)

This reactor is comprised of the following projects:

- Monitoring App - React JS (monitor-app)
- Monitoring App - Spring Boot (monitor-server)

## Description

This repository is a CRUD App Build with React JS leveraging the Spring Boot framework to expose a GraphQL API

The app is used to manage applications (servers) with their health check information in order to have an overview.

Please refer to the individual modules for more information

## CI/CD
This app uses Travis CI as continous integration platform and a Kubernetes environment for deployment. Please refer to the helm_chart
directory for the Kubernetes manifest. In addition, the final artificat is the `monitor-server` module.

## Demo
![Alt text](images/overview.png?raw=true "Overview Demo")