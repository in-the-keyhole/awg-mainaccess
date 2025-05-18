package com.awginc.mainaccess.web.controllers;

import com.awginc.mainaccess.web.models.AuthConfigModel;
import com.awginc.mainaccess.web.models.ConfigModel;
import com.awginc.mainaccess.web.models.MsalAuthConfigModel;
import com.awginc.mainaccess.web.models.OidcAuthConfigModel;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

/**
 * Delivers configuration information to the React application.
 */
@RestController
public class ConfigController {
    
    @Value("${conf.mainaccess.auth.oidc.authority}")
    private String oidcAuthority;

    @Value("${conf.mainaccess.auth.oidc.clientId}")
    private String oidcClientId;

    @GetMapping("/config")
    public ConfigModel config() {
        return new ConfigModel(
            new AuthConfigModel(
                new OidcAuthConfigModel(oidcAuthority, oidcClientId),
                null
            )
        );
    }

}
