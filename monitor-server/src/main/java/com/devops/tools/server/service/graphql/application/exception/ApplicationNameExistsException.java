package com.devops.tools.server.service.graphql.application.exception;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.common.annotations.VisibleForTesting;
import graphql.ErrorType;
import graphql.GraphQLError;
import graphql.language.SourceLocation;
import lombok.AllArgsConstructor;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
public class ApplicationNameExistsException extends RuntimeException implements GraphQLError {

    @VisibleForTesting
    static final String MESSAGE_FORMAT = "Application with Name %s exists already";

    @VisibleForTesting
    static final String APPLICATION_NAME_PARAM = "applicationName";

    private String name;

    @Override
    public String getMessage() {
        return String.format(MESSAGE_FORMAT, name);
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
        return Collections.singletonMap(APPLICATION_NAME_PARAM, name);
    }

    @Override
    @JsonIgnore
    public StackTraceElement[] getStackTrace() {
        return super.getStackTrace();
    }
}