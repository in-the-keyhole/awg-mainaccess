package com.awginc.mainaccess.web.controllers;

import com.awginc.mainaccess.web.config.ConfigProps;
import com.awginc.mainaccess.web.models.ConfigModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

/**
 * Delivers configuration information to the React application.
 */
@RestController
public class ConfigController {
    
    @Autowired
    private ConfigProps config;

    @GetMapping("/config")
    public ConfigModel config() {
        return new ConfigModel(
            ServletUriComponentsBuilder.fromCurrentContextPath().path("/").build().toUriString(),
            config.getAuth()
        );
    }

}
