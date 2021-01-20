package com.devops.tools.server.service.graphql.application;

import com.devops.tools.server.repository.ApplicationRepository;
import com.devops.tools.server.repository.entity.JpaApplication;
import com.devops.tools.server.service.graphql.application.exception.ApplicationNameExistsException;
import com.devops.tools.server.service.graphql.application.exception.ApplicationNotFoundException;
import com.devops.tools.server.service.graphql.application.exception.InvalidEndpointFormatException;
import com.devops.tools.server.service.graphql.exception.InternalServerException;
import org.apache.commons.validator.routines.UrlValidator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ApplicationMutationTest {

    @Mock
    private ApplicationRepository applicationRepository;

    @Mock
    private UrlValidator urlValidator;

    @BeforeEach
    void setUp() {
        lenient().when(urlValidator.isValid(anyString())).thenReturn(true);
    }

    @InjectMocks
    private ApplicationMutation applicationMutation;

    @Test
    void testCreateApplicationWithNullInput() {
        assertAll(
            () ->  assertThrows(NullPointerException.class, () -> applicationMutation.createApplication("name", null)),
            () ->  assertThrows(NullPointerException.class, () -> applicationMutation.createApplication(null, "endpoint"))
        );
    }

    @Test
    void testCreateApplicationWithNullInValidUrl() {
        lenient().when(urlValidator.isValid(anyString())).thenReturn(false);
        assertThrows(InvalidEndpointFormatException.class, () -> applicationMutation.createApplication("name", "endpoint"));
    }

    @Test
    void testUpdateApplicationWithNullInValidUrl() {
        lenient().when(urlValidator.isValid(anyString())).thenReturn(false);
        assertThrows(InvalidEndpointFormatException.class, () -> applicationMutation.updateApplication("name", "endpoint", 1L));
    }

    @Test
    void testCreateApplicationWithExistingAppName() {
        final JpaApplication application = ApplicationTestDataUtil.getSampleApplication();

        when(applicationRepository.findByName(application.getName())).thenReturn(Optional.of(application));

        assertThrows(ApplicationNameExistsException.class, () -> applicationMutation.createApplication(application.getName(),
                application.getHealthCheck().getEndpoint()));
    }

    @Test
    void testCreateApplication() {
        final JpaApplication application = ApplicationTestDataUtil.getSampleApplication();
        final ArgumentCaptor<JpaApplication> appArgumentCaptor = ArgumentCaptor.forClass(JpaApplication.class);

        when(applicationRepository.findByName(application.getName())).thenReturn(Optional.empty());
        when(applicationRepository.save(any(JpaApplication.class))).thenReturn(application);

        final long actualId = applicationMutation.createApplication(application.getName(),
                application.getHealthCheck().getEndpoint());

        assertThat(actualId).isEqualTo(application.getId());

        verify(applicationRepository).save(appArgumentCaptor.capture());
        assertThat(appArgumentCaptor.getValue()).isEqualTo(application);
    }

    @Test
    public void testCreateApplicationForDataAccessExceptionOnFindByName() {
        when(applicationRepository.findByName(anyString())).thenThrow(new DataIntegrityViolationException(""));
        assertThrows(InternalServerException.class, () -> applicationMutation.createApplication("name", "endpoint"));
    }

    @Test
    public void testCreateApplicationForDataAccessExceptionOnSave() {
        when(applicationRepository.save(any(JpaApplication.class))).thenThrow(new DataIntegrityViolationException(""));
        assertThrows(InternalServerException.class, () -> applicationMutation.createApplication("name", "endpoint"));
    }

    @Test
    void testUpdateApplicationWithNullInput() {
        assertAll(
           () ->  assertThrows(NullPointerException.class, () -> applicationMutation.updateApplication("name", null, 1)),
           () ->  assertThrows(NullPointerException.class, () -> applicationMutation.updateApplication(null, "endpoint", 1))
        );
    }

    @Test
    void testUpdateApplicationWithNonExistingApp() {
        final JpaApplication application = ApplicationTestDataUtil.getSampleApplication();

        when(applicationRepository.findById(application.getId())).thenReturn(Optional.empty());

        assertThrows(ApplicationNotFoundException.class, () -> applicationMutation.updateApplication("name", "endpoint",
                application.getId()));
    }

    @Test
    void testUpdateApplication() {
        final JpaApplication application = ApplicationTestDataUtil.getSampleApplication();
        final ArgumentCaptor<JpaApplication> appArgumentCaptor = ArgumentCaptor.forClass(JpaApplication.class);

        when(applicationRepository.findById(application.getId())).thenReturn(Optional.of(application));
        when(applicationRepository.save(any(JpaApplication.class))).thenReturn(application);

        assertThat(applicationMutation.updateApplication(application.getName(),
                application.getHealthCheck().getEndpoint(), application.getId())).isTrue();

        verify(applicationRepository).save(appArgumentCaptor.capture());
        assertThat(appArgumentCaptor.getValue()).isEqualTo(application);
    }

    @Test
    public void testUpdateApplicationForDataAccessExceptionOnFindById() {
        when(applicationRepository.findById(anyLong())).thenThrow(new DataIntegrityViolationException(""));
        assertThrows(InternalServerException.class, () -> applicationMutation.updateApplication( "name", "endpoint", 1L));
    }

    @Test
    public void testUpdateApplicationForDataAccessExceptionOnSave() {
        when(applicationRepository.findById(anyLong())).thenReturn(Optional.of(ApplicationTestDataUtil.getSampleApplication()));
        when(applicationRepository.save(any(JpaApplication.class))).thenThrow(new DataIntegrityViolationException(""));
        assertThrows(InternalServerException.class, () -> applicationMutation.updateApplication("name", "endpoint", 1L));
    }

    @Test
    void testDeleteApplicationWithZero() {
        final IllegalArgumentException thrown =
                assertThrows(IllegalArgumentException.class, () -> applicationMutation.deleteApplication(0));
        assertThat(thrown.getMessage()).isEqualTo("applicationId must be greater than 0");
    }


    @Test
    void testDeleteApplicationWithNegativeId() {
        final IllegalArgumentException thrown =
                assertThrows(IllegalArgumentException.class, () -> applicationMutation.deleteApplication(-1));
        assertThat(thrown.getMessage()).isEqualTo("applicationId must be greater than 0");
    }

    @Test
    void testDeleteApplication() {
        final JpaApplication application = ApplicationTestDataUtil.getSampleApplication();

        doNothing().when(applicationRepository).deleteById(application.getId());

        assertThat(applicationMutation.deleteApplication(application.getId())).isTrue();

        verify(applicationRepository).deleteById(application.getId());
    }

    @Test
    void testDeleteApplicationWithNonExistingApp() {
        doThrow(new EmptyResultDataAccessException(1)).when(applicationRepository).deleteById(1L);
        assertThrows(ApplicationNotFoundException.class, () -> applicationMutation.deleteApplication(1L));
    }

    @Test
    public void testDeleteApplicationForDataAccessException() {
        final long id = 1L;
        doThrow(new DataIntegrityViolationException("")).when(applicationRepository).deleteById(id);
        assertThrows(InternalServerException.class, () -> applicationMutation.deleteApplication(id));
    }

}
