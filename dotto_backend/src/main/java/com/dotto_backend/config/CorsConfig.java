package com.dotto_backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

import java.util.Arrays;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Value("${app.cors.allowed-origins}")
    private String allowed;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String[] origins = Arrays.stream(allowed.split(",")).map(String::trim).toArray(String[]::new);
        registry.addMapping("/api/**")
                .allowedOrigins(origins)
                .allowedMethods("GET","POST","OPTIONS")
                .allowCredentials(false);
    }
}