package com.awginc.mainaccess.web;

import jakarta.servlet.ServletContext;

import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import org.springframework.web.servlet.*;
import org.springframework.web.servlet.support.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.*;

@Controller
public class ConfigController {
    
    @Value("${conf.mainaccess.api.uri}")
    private String apiUri;

    @GetMapping("/config.json")
    public String config() {
        return Map.ofEntries(
            entry("api", Map.ofEntries(
                entry("uri", apiUri)
            )
        ));
    }

}
