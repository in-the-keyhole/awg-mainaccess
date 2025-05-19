description = "awg-mainaccess-idp"

plugins {
    id("java")
    id("application")
    id("buildlogic.java-conventions")
    id("org.springframework.boot") version "3.4.5"
    id("com.google.cloud.tools.jib") version "3.4.5"
}

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

jib {
    container {
        ports = listOf("8080")
        format = com.google.cloud.tools.jib.api.buildplan.ImageFormat.OCI
    }
    to {
        image = "awg-mainaccess-idp"
        tags = setOf(project.version.toString().replace("+", "_"))
    }
}

dependencies {
    implementation(platform(org.springframework.boot.gradle.plugin.SpringBootPlugin.BOM_COORDINATES))
    implementation("org.springframework.boot:spring-boot-starter-actuator:3.4.5")
    implementation("org.springframework.boot:spring-boot-starter-security:3.4.5")
    implementation("org.springframework.boot:spring-boot-starter-oauth2-authorization-server:3.4.5")
}

tasks.withType<com.google.cloud.tools.jib.gradle.JibTask>().configureEach {
    notCompatibleWithConfigurationCache("because https://github.com/GoogleContainerTools/jib/issues/3132")
}

tasks.named<org.springframework.boot.gradle.tasks.run.BootRun>("bootRun") {
    args("--spring.profiles.active=local")
}
