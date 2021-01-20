package com.devops.tools.server.service.graphql.application;

import com.devops.tools.server.repository.entity.JpaApplication;
import com.devops.tools.server.repository.entity.JpaHealthCheck;
import lombok.experimental.UtilityClass;

@UtilityClass
public class ApplicationTestDataUtil {

    public static JpaApplication getSampleApplication() {
        final JpaApplication application = new JpaApplication();
        application.setId(1L);
        application.setName("Application");
        application.setHealthCheck(getSampleHealthCheck());
        return application;
    }

    public static JpaHealthCheck getSampleHealthCheck() {
        final JpaHealthCheck healthCheck = new JpaHealthCheck();
        healthCheck.setEndpoint("https://someurl.com");
        healthCheck.setId(1L);
        return healthCheck;
    }
}
