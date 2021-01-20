package com.devops.tools.server.repository;

import com.devops.tools.server.repository.entity.JpaApplication;
import com.devops.tools.server.service.graphql.application.ApplicationTestDataUtil;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@ActiveProfiles("test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ApplicationRepositoryTest {

    @Autowired
    private ApplicationRepository repository;

    @Test
    public void testFindByName() {
        final JpaApplication expectedApplication = ApplicationTestDataUtil.getSampleApplication();
        repository.save(expectedApplication);

        final Optional<JpaApplication> actualApplication = repository.findByName(expectedApplication.getName());
        assertThat(actualApplication).isNotEmpty();

        assertThat(actualApplication.get()).isEqualTo(expectedApplication);
    }

    @Test
    public void testFindByNameContaining() {
        final JpaApplication expectedApplication = ApplicationTestDataUtil.getSampleApplication();
        repository.save(expectedApplication);

        final String originalAppName = expectedApplication.getName();
        final String partialName = originalAppName.substring(0, 1);

        final List<JpaApplication> actualApplication = repository.findByNameContainingIgnoreCase(partialName);
        assertThat(actualApplication).hasSize(1);

        assertThat(actualApplication.get(0)).isEqualTo(expectedApplication);
    }

}
