group = "com.awginc.mainaccess"

plugins {
    id("com.bisiach.gradle.gitversion-plugin")
}

var ext = project.extensions.findByType<com.bisiach.gradle.gitversion.GitVersionPluginExtension>();
project.version = ext!!.FullSemVer;
