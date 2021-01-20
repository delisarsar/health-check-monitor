package com.devops.tools.server.repository.entity;

import com.devops.tools.server.repository.AbstractJpaEntity;
import com.devops.tools.server.common.Application;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "APPLICATION")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class JpaApplication extends AbstractJpaEntity implements Application {

    @NotNull
    @Column(unique = true)
    private String name;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "healthCheckId")
    private JpaHealthCheck healthCheck;

}
