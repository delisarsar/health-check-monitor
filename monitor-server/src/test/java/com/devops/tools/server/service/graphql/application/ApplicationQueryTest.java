package com.devops.tools.server.service.graphql.application;

import com.devops.tools.server.repository.ApplicationRepository;
import com.devops.tools.server.repository.entity.JpaApplication;
import com.devops.tools.server.service.graphql.application.exception.ApplicationNotFoundException;
import com.devops.tools.server.service.graphql.exception.InternalServerException;
import com.devops.tools.server.service.graphql.response.ApplicationDto;
import org.apache.commons.lang3.StringUtils;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

import static com.devops.tools.server.service.graphql.application.ApplicationQuery.START_PAGE_FOR_ALL;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ApplicationQueryTest {

    @Mock
    private ApplicationRepository applicationRepository;

    @InjectMocks
    private ApplicationQuery applicationQuery;

    @Test
    void testGetApplicationsWithZero() {
        final IllegalArgumentException thrown =
                assertThrows(IllegalArgumentException.class, () -> applicationQuery.getApplications(0));
        assertThat(thrown.getMessage()).isEqualTo("applicationId must be greater than 0");
    }

    @Test
    void testGetApplicationsWithNegativeId() {
        final IllegalArgumentException thrown =
                assertThrows(IllegalArgumentException.class, () -> applicationQuery.getApplications(-1));
        assertThat(thrown.getMessage()).isEqualTo("applicationId must be greater than 0");
    }

    @Test
    void testGetApplicationsByIdWithIdWithZero() {
        final IllegalArgumentException thrown =
                assertThrows(IllegalArgumentException.class, () -> applicationQuery.getApplicationById(0));
        assertThat(thrown.getMessage()).isEqualTo("applicationId must be greater than 0");
    }

    @Test
    void testGetApplicationsWithIdWithNegative() {
        final IllegalArgumentException thrown =
                assertThrows(IllegalArgumentException.class, () -> applicationQuery.getApplicationById(-1));
        assertThat(thrown.getMessage()).isEqualTo("applicationId must be greater than 0");
    }

    @Test
    void testGetApplicationsWithId() {
        final JpaApplication expectedApplication = ApplicationTestDataUtil.getSampleApplication();
        when(applicationRepository.findById(expectedApplication.getId())).thenReturn(Optional.of(expectedApplication));

        final ApplicationDto actualApplication = applicationQuery.getApplicationById(expectedApplication.getId());
        verifyApplicationsAreEqual(actualApplication, expectedApplication);
    }

    @Test
    void testGetApplicationsWithIdForApplicationNotFoundException() {
        when(applicationRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(ApplicationNotFoundException.class, () -> applicationQuery.getApplicationById(1));
    }

    @Test
    void testGetApplicationsWithIdForDataStoreException() {
        when(applicationRepository.findById(1L)).thenThrow(new DataIntegrityViolationException(""));
        assertThrows(InternalServerException.class, () -> applicationQuery.getApplicationById(1));
    }

    @Test
    void testGetApplications() {
        final int count = 1;
        final JpaApplication expectedApplication = ApplicationTestDataUtil.getSampleApplication();
        final ArgumentCaptor<Pageable> pageableArgumentCaptor = ArgumentCaptor.forClass(Pageable.class);
        final Page expectedPageResponse = mock(Page.class);

        when(expectedPageResponse.toList()).thenReturn(List.of(expectedApplication));
        when(applicationRepository.findAll(any(Pageable.class))).thenReturn(expectedPageResponse);

        final List<ApplicationDto> actualApplications = applicationQuery.getApplications(count);
        assertThat(actualApplications).hasSize(1);
        verifyApplicationsAreEqual(actualApplications.get(0), expectedApplication);

        verify(applicationRepository).findAll(pageableArgumentCaptor.capture());

        final Pageable capturedPageableParam = pageableArgumentCaptor.getValue();
        assertThat(capturedPageableParam.getPageNumber()).isEqualTo(START_PAGE_FOR_ALL);
        assertThat(capturedPageableParam.getPageSize()).isEqualTo(count);
    }

    @Test
    public void testGetApplicationsForDataAccessException() {
        when(applicationRepository.findAll(any(Pageable.class))).thenThrow(new DataIntegrityViolationException(""));
        assertThrows(InternalServerException.class, () -> applicationQuery.getApplications(1));
    }

    @Test
    void testGetApplicationsLikeNameWithNullName() {
        assertThrows(NullPointerException.class, () -> applicationQuery.getApplicationsLikeName(null));
    }

    @Test
    void testGetApplicationsLikeName() {
        final JpaApplication expectedApplication = ApplicationTestDataUtil.getSampleApplication();

        when(applicationRepository.findByNameContainingIgnoreCase("name")).thenReturn(List.of(expectedApplication));

        final List<ApplicationDto> actualApplications = applicationQuery.getApplicationsLikeName("name");
        assertThat(actualApplications).hasSize(1);
        verifyApplicationsAreEqual(actualApplications.get(0), expectedApplication);
    }

    @Test
    void testGetApplicationsLikeNameWithBlankInput() {
        final JpaApplication expectedApplication = ApplicationTestDataUtil.getSampleApplication();
        final Page page = mock(Page.class);
        when(page.toList()).thenReturn(List.of(expectedApplication));

        when(applicationRepository.findAll(any(Pageable.class))).thenReturn(page);

        final List<ApplicationDto> actualApplications = applicationQuery.getApplicationsLikeName(StringUtils.EMPTY);
        assertThat(actualApplications).hasSize(1);
        verifyApplicationsAreEqual(actualApplications.get(0), expectedApplication);
    }

    @Test
    void testGetApplicationsLikeNameForDataAccessException() {
        when(applicationRepository.findByNameContainingIgnoreCase("name")).thenThrow(new DataIntegrityViolationException(""));
        assertThrows(InternalServerException.class, () -> applicationQuery.getApplicationsLikeName("name"));
    }

    private void verifyApplicationsAreEqual(ApplicationDto actualApplication, JpaApplication expectedApplication ) {
        assertThat(actualApplication.getId()).isEqualTo(expectedApplication.getId());
        assertThat(actualApplication.getName()).isEqualTo(expectedApplication.getName());
        assertThat(actualApplication.getHealthCheck().getEndpoint()).isEqualTo(expectedApplication.getHealthCheck().getEndpoint());
    }


}
