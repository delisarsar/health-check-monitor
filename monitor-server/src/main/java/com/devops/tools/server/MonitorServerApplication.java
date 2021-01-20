package com.devops.tools.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan("com.devops.tools")
@EntityScan("com.devops.tools.server.repository.entity")
@EnableJpaRepositories(basePackages = {"com.devops.tools.server.repository"})
public class MonitorServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(MonitorServerApplication.class, args);
	}

}
