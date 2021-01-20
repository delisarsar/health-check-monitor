package com.devops.tools.server.repository.entity;

import com.devops.tools.server.common.HealthCheck;
import com.devops.tools.server.repository.AbstractJpaEntity;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "HEALTH_CHECK")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class JpaHealthCheck extends AbstractJpaEntity implements HealthCheck {

    @NotNull
    private String endpoint;

}