package com.devops.tools.server.service.graphql.application.exception;

import graphql.ErrorType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Map;

import static com.devops.tools.server.service.graphql.application.exception.ApplicationNotFoundException.APPLICATION_ID_PARAM;
import static com.devops.tools.server.service.graphql.application.exception.ApplicationNotFoundException.MESSAGE_FORMAT;
import static org.assertj.core.api.Assertions.assertThat;

public class ApplicationNotFoundExceptionTest {

    private static final long APPLICATION_ID = 1;

    private ApplicationNotFoundException exception;

    @BeforeEach
    void setUp() {
        this.exception = new ApplicationNotFoundException(APPLICATION_ID);
    }

    @Test
    void testGetMessage() {
        assertThat(exception.getMessage()).isEqualTo(String.format(MESSAGE_FORMAT, APPLICATION_ID));
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
        assertThat(exception.getExtensions()).containsExactlyEntriesOf(Map.of(APPLICATION_ID_PARAM, APPLICATION_ID));
    }

}
