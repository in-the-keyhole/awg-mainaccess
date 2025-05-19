package com.awginc.mainaccess.web.controllers;

import com.awginc.mainaccess.web.config.ConfigProps;
import com.awginc.mainaccess.web.models.AppModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AppController {

    @Autowired
    private ConfigProps config;

    @GetMapping("/apps")
    public List<AppModel> apps() {
        return config.getApps();
    }

}
