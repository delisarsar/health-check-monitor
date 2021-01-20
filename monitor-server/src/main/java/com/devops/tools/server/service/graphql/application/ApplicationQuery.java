package com.devops.tools.server.service.graphql.application;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.devops.tools.server.repository.ApplicationRepository;
import com.devops.tools.server.repository.entity.JpaApplication;
import com.devops.tools.server.repository.entity.JpaHealthCheck;
import com.devops.tools.server.service.graphql.application.exception.ApplicationNotFoundException;
import com.devops.tools.server.service.graphql.exception.InternalServerException;
import com.devops.tools.server.service.graphql.response.ApplicationDto;
import com.devops.tools.server.service.graphql.response.HealthCheckDto;
import com.google.common.annotations.VisibleForTesting;
import com.google.common.base.Preconditions;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class ApplicationQuery implements GraphQLQueryResolver {

    @VisibleForTesting
    static final int START_PAGE_FOR_ALL = 0;

    static final int DEFAULT_MAX_SIZE = 100;

    private ApplicationRepository applicationRepository;

    @Transactional(readOnly = true)
    public List<ApplicationDto> getApplications(int count) {
        Preconditions.checkArgument(count > 0, "applicationId must be greater than 0");
        log.info("Attempting to retrieve all applications with limit {}", count);
        try {
            return asDtoList(applicationRepository.findAll(PageRequest.of(START_PAGE_FOR_ALL, count)).toList());
        } catch (DataAccessException ex) {
            log.error("Unable to retrieve applications with count {}", count, ex);
            throw new InternalServerException();
        }
    }

    @Transactional(readOnly = true)
    public List<ApplicationDto> getApplicationsLikeName(@NonNull String name) {
        log.info("Attempting to retrieve all applications with name like {}", name);
        try {
            if (name.isBlank()) return getApplications(DEFAULT_MAX_SIZE);
            return asDtoList(applicationRepository.findAllByNameContaining(name));
        } catch (DataAccessException ex) {
            log.error("Unable to retrieve applications with name like {}", name, ex);
            throw new InternalServerException();
        }
    }

    @Transactional(readOnly = true)
    public ApplicationDto getApplicationById(final long appId) {
        Preconditions.checkArgument(appId > 0, "applicationId must be greater than 0");
        try {
            return applicationRepository.findById(appId).map(this::asDto)
                                        .orElseThrow(() -> new ApplicationNotFoundException(appId));
        } catch (DataAccessException ex) {
            log.error("Unable to retrieve applications with id {}", appId, ex);
            throw new InternalServerException();
        }
    }

    private List<ApplicationDto> asDtoList(List<JpaApplication> jpaApplications) {
        return jpaApplications.stream()
                               .map(jpaApplication -> asDto(jpaApplication))
                               .collect(Collectors.toList());
    }

    private ApplicationDto asDto(final JpaApplication jpaApplication) {
        final JpaHealthCheck jpaHealthCheck = jpaApplication.getHealthCheck();
        return ApplicationDto.builder().id(jpaApplication.getId())
                                       .name(jpaApplication.getName())
                                       .healthCheck(HealthCheckDto.builder()
                                                                  .id(jpaHealthCheck.getId())
                                                                  .endpoint(jpaHealthCheck.getEndpoint())
                                                                  .build())
                                       .build();
    }

}
