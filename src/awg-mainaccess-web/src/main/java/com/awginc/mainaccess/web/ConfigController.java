package com.awginc.mainaccess.web;

import java.util.*;

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
    public Map<String, Object> config() {
        return Map.ofEntries(
            Map.entry("api", Map.ofEntries(
                Map.entry("uri", apiUri)
            ))
        );
    }

}
