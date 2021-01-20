package com.devops.tools.server.config;

import org.apache.commons.validator.routines.UrlValidator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ServiceConfig {

    @Bean
    public UrlValidator provideUrlValidator() {
        return UrlValidator.getInstance();
    }
}
