package com.devops.tools.server.service.graphql.exception;

import graphql.ErrorType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class InternalServerExceptionTest {

    private InternalServerException exception;

    @BeforeEach
    void setUp() {
        this.exception = new InternalServerException();
    }

    @Test
    void testGetMessage() {
        assertThat(exception.getMessage()).isEqualTo(InternalServerException.MESSAGE);
    }

    @Test
    public void testGetLocations() {
        assertThat(exception.getLocations()).isNull();
    }

    @Test
    public void testGetErrorType() {
        assertThat(exception.getErrorType()).isEqualTo(ErrorType.DataFetchingException);
    }

    @Test
    public void testGetExtensions() {
        assertThat(exception.getExtensions()).isEmpty();
    }

}
