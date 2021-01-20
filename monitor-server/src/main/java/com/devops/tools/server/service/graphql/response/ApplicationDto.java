package com.devops.tools.server.service.graphql.response;

import com.devops.tools.server.common.Application;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApplicationDto implements Application {

    private Long id;
    private String name;
    private HealthCheckDto healthCheck;

}
