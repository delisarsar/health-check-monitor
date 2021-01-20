package com.devops.tools.server.repository;

import com.devops.tools.server.repository.entity.JpaApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<JpaApplication, Long> {
    Optional<JpaApplication> findByName(String name);
    List<JpaApplication> findByNameContainingIgnoreCase(String name);
}
