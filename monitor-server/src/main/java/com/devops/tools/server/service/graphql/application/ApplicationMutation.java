package com.devops.tools.server.service.graphql.application;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.devops.tools.server.repository.ApplicationRepository;
import com.devops.tools.server.repository.entity.JpaApplication;
import com.devops.tools.server.repository.entity.JpaHealthCheck;
import com.devops.tools.server.service.graphql.application.exception.ApplicationNameExistsException;
import com.devops.tools.server.service.graphql.application.exception.ApplicationNotFoundException;
import com.devops.tools.server.service.graphql.application.exception.InvalidEndpointFormatException;
import com.devops.tools.server.service.graphql.exception.InternalServerException;
import com.google.common.base.Preconditions;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.validator.routines.UrlValidator;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class ApplicationMutation implements GraphQLMutationResolver {

    private ApplicationRepository applicationRepository;
    private UrlValidator urlValidator;

    @Transactional
    public Long createApplication(@NonNull String name, @NonNull String endpoint) {
        log.info("Attempting to create a new application with name as {} and endpoint", name, endpoint);
        validateEndpoint(endpoint);
        try {
            final Optional<JpaApplication> jpaApplication = applicationRepository.findByName(name);
            if (jpaApplication.isPresent()) {
                log.warn("The application with name {} exists already", name);
                throw new ApplicationNameExistsException(name);
            }
            final JpaApplication newApplication = new JpaApplication(name, new JpaHealthCheck(endpoint));
            return applicationRepository.save(newApplication).getId();
        } catch (DataAccessException ex) {
            log.error("Unable to create an application", ex);
            throw new InternalServerException();
        }
    }

    @Transactional
    public boolean updateApplication(@NonNull String name, @NonNull String endpoint, long appId) {
        log.info("Attempting to update an existing application with name {} endpoint {} and id {}", name, endpoint, appId);
        validateApplicationId(appId);
        validateEndpoint(endpoint);
        try {
            final Optional<JpaApplication> jpaApplication = applicationRepository.findById(appId);
            if (jpaApplication.isEmpty()) {
                log.warn("The application with {} to be updated was not found", appId);
                throw new ApplicationNotFoundException(appId);
            }
            final JpaApplication repoApplication = jpaApplication.get();
            repoApplication.setName(name);
            repoApplication.getHealthCheck().setEndpoint(endpoint);
            applicationRepository.save(jpaApplication.get());
            return true;
        } catch (DataAccessException ex) {
            log.error("Unable to update an application", ex);
            throw new InternalServerException();
        }
    }

    @Transactional
    public boolean deleteApplication(long applicationId) {
        validateApplicationId(applicationId);
        log.info("Attempting to delete the application with id {}", applicationId);
        try {
            applicationRepository.deleteById(applicationId);
            return true;
        } catch (EmptyResultDataAccessException ex) {
            log.warn("The application with {} to be deleted was not found", applicationId);
            throw new ApplicationNotFoundException(applicationId);
        } catch (DataAccessException ex) {
            log.error("Unable to delete an application with id {}", applicationId, ex);
            throw new InternalServerException();
        }
    }

    private void validateApplicationId(long applicationId) {
        Preconditions.checkArgument(applicationId > 0, "applicationId must be greater than 0");
    }

    private void validateEndpoint(String endpoint) {
        if (!urlValidator.isValid(endpoint)) {
            throw new InvalidEndpointFormatException(endpoint);
        }
    }

}
