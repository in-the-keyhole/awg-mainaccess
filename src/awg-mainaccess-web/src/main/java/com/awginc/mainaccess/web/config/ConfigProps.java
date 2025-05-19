package com.awginc.mainaccess.web.config;

import com.awginc.mainaccess.web.models.AppModel;
import com.awginc.mainaccess.web.models.AuthConfigModel;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@ConfigurationProperties(prefix = "conf.mainaccess")
public class ConfigProps {

    private AuthConfigModel auth;
    private List<AppModel> apps;

    public AuthConfigModel getAuth() {
        return auth;
    }

    public void setAuth(AuthConfigModel auth) {
        this.auth = auth;
    }

    public List<AppModel> getApps() {
        return apps;
    }

    public void setApps(List<AppModel> apps) {
        this.apps = apps;
    }

}
