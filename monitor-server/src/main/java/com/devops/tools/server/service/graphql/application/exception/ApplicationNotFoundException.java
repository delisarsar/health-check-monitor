package com.devops.tools.server.service.graphql.application.exception;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.common.annotations.VisibleForTesting;
import graphql.ErrorType;
import graphql.GraphQLError;
import graphql.language.SourceLocation;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
public class ApplicationNotFoundException extends RuntimeException implements GraphQLError {

    @VisibleForTesting
    static final String MESSAGE_FORMAT = "Application with ID %d could not be found";

    @VisibleForTesting
    static final String APPLICATION_ID_PARAM = "applicationId";

    private Long applicationId;

    @Override
    public String getMessage() {
        return String.format(MESSAGE_FORMAT, applicationId);
    }

    @Override
    public List<SourceLocation> getLocations() {
        return null;
    }

    @Override
    public ErrorType getErrorType() {
        return ErrorType.ValidationError;
    }

    @Override
    public Map<String, Object> getExtensions() {
        return Map.of(APPLICATION_ID_PARAM, applicationId);
    }

    @Override
    @JsonIgnore
    public StackTraceElement[] getStackTrace() {
        return super.getStackTrace();
    }
}