package com.devops.tools.server.service.graphql.response;

import com.devops.tools.server.common.HealthCheck;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HealthCheckDto implements HealthCheck {
    private Long id;
    private String endpoint;
}
