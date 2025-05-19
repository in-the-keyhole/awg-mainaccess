package com.awginc.mainaccess.oidc;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
public class SecurityConfig {

    @Bean
    public UserDetailsService users() {
        var users = User.builder();

        return new InMemoryUserDetailsManager(
            users
                .username("user")
                .password("{noop}password123")
                .roles("USER")
                .build(),
            users
                .username("admin")
                .password("{noop}password123")
                .roles("USER", "ADMIN")
                .build());
    }

}
