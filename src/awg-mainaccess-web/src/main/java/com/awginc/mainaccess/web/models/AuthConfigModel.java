package com.awginc.mainaccess.web.models;

public record AuthConfigModel(OidcAuthConfigModel oidc, MsalAuthConfigModel msal) {

}
