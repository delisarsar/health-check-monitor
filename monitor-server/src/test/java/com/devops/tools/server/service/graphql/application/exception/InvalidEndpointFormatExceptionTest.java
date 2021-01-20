package com.devops.tools.server.service.graphql.application.exception;

import graphql.ErrorType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Map;

import static com.devops.tools.server.service.graphql.application.exception.InvalidEndpointFormatException.MESSAGE_FORMAT;
import static com.devops.tools.server.service.graphql.application.exception.InvalidEndpointFormatException.ENDPOINT_PARAM;
import static org.assertj.core.api.Assertions.assertThat;

public class InvalidEndpointFormatExceptionTest {

    private static final String ENDPOINT = "https://google.com";

    private InvalidEndpointFormatException exception;

    @BeforeEach
    void setUp() {
        this.exception = new InvalidEndpointFormatException(ENDPOINT);
    }

    @Test
    void testGetMessage() {
        assertThat(exception.getMessage()).isEqualTo(String.format(MESSAGE_FORMAT, ENDPOINT));
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
        assertThat(exception.getExtensions()).containsExactlyEntriesOf(Map.of(ENDPOINT_PARAM, ENDPOINT));
    }

}
