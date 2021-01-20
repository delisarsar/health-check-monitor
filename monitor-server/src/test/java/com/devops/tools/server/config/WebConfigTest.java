package com.devops.tools.server.config;

import org.apache.commons.lang3.StringUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.context.support.GenericApplicationContext;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;

import static org.mockito.Mockito.*;

public class WebConfigTest {

    private WebConfig webConfig;

    @BeforeEach
    void setUp() {
        this.webConfig = new WebConfig();
    }

    @Test
    void testAddViewControllers() {
        final ViewControllerRegistry registry = spy(new ViewControllerRegistry(new GenericApplicationContext()));
        final ViewControllerRegistration controllerRegistration = mock(ViewControllerRegistration.class);

        when(registry.addViewController(anyString())).thenReturn(controllerRegistration);
        this.webConfig.addViewControllers(registry);

        verify(registry).addViewController("/");
        verify(controllerRegistration).setViewName("forward:/monitor-app/index.html");
    }

    @Test
    void testAddResourceHandlers() {
        final ResourceHandlerRegistration handlerRegistration = mock(ResourceHandlerRegistration.class);
        final ResourceHandlerRegistry registry = spy(new ResourceHandlerRegistry(new GenericApplicationContext(), null));

        when(registry.addResourceHandler(anyString())).thenReturn(handlerRegistration);

        this.webConfig.addResourceHandlers(registry);

        verify(registry).addResourceHandler(StringUtils.EMPTY, "/");
        verify(registry).addResourceHandler("/**");
        verify(registry).addResourceHandler("/vendor/**");

        verify(handlerRegistration).addResourceLocations(WebConfig.CLASSPATH_RESOURCE_LOCATIONS);
        verify(handlerRegistration).addResourceLocations("classpath:/static/vendor/");
    }
}
