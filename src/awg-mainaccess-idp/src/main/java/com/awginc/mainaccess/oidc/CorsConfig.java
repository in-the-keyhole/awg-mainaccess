package com.awginc.mainaccess.oidc;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedHeader("X-XSRF-TOKEN");
        config.addAllowedHeader(HttpHeaders.CONTENT_TYPE);
        config.setAllowedMethods(Arrays.asList("GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedOrigins(Collections.singletonList("*"));
        config.setAllowCredentials(false);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
