package com.devops.tools.server.service.graphql.application.exception;

import graphql.ErrorType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Map;

import static com.devops.tools.server.service.graphql.application.exception.ApplicationNameExistsException.APPLICATION_NAME_PARAM;
import static com.devops.tools.server.service.graphql.application.exception.ApplicationNameExistsException.MESSAGE_FORMAT;
import static org.assertj.core.api.Assertions.assertThat;

public class ApplicationNameExistsExceptionTest {

    private static final String APPLICATION_NAME = "Some name";

    private ApplicationNameExistsException exception;

    @BeforeEach
    void setUp() {
        this.exception = new ApplicationNameExistsException(APPLICATION_NAME);
    }

    @Test
    void testGetMessage() {
        assertThat(exception.getMessage()).isEqualTo(String.format(MESSAGE_FORMAT, APPLICATION_NAME));
    }

    @Test
    public void testGetLocations() {
        assertThat(exception.getLocations()).isNull();
    }

    @Test
    public void testGetErrorType() {
        assertThat(exception.getErrorType()).isEqualTo(ErrorType.ValidationError);
    }

    @Test
    public void testGetExtensions() {
        assertThat(exception.getExtensions()).containsExactlyEntriesOf(Map.of(APPLICATION_NAME_PARAM, APPLICATION_NAME));
    }

}
