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
public class InvalidEndpointFormatException extends RuntimeException implements GraphQLError {

    @VisibleForTesting
    static final String MESSAGE_FORMAT = "Endpoint with %s is malformed";

    @VisibleForTesting
    static final String ENDPOINT_PARAM = "endpoint";

    private String endpoint;

    @Override
    public String getMessage() {
        return String.format(MESSAGE_FORMAT, endpoint);
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
        return Map.of(ENDPOINT_PARAM, endpoint);
    }

    @Override
    @JsonIgnore
    public StackTraceElement[] getStackTrace() {
        return super.getStackTrace();
    }
}