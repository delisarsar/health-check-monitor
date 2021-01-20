package com.devops.tools.server.common;

public interface Application extends Id {
    String getName();
    HealthCheck getHealthCheck();
}
