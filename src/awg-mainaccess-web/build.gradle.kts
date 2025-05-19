description = "awg-mainaccess-web"

plugins {
    id("java")
    id("application")
    id("buildlogic.java-conventions")
    id("org.springframework.boot") version "3.4.5"
    id("com.google.cloud.tools.jib") version "3.4.5"
    id("gg.jte.gradle") version "3.2.1"
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
        image = "awg-mainaccess-web"
        tags = setOf(project.version.toString().replace("+", "_"))
    }
}

dependencies {
    implementation(platform(org.springframework.boot.gradle.plugin.SpringBootPlugin.BOM_COORDINATES))
    implementation("org.springframework.boot:spring-boot-starter-actuator:3.4.4")
    implementation("org.springframework.boot:spring-boot-starter-web:3.4.4") {
        exclude("org.springframework.boot", "spring-boot-starter-tomcat")
    }
    implementation("org.springframework.boot:spring-boot-starter-jetty")
    implementation("org.springframework.boot:spring-boot-starter-webflux:3.4.4")
    implementation(platform("com.azure.spring:spring-cloud-azure-dependencies:5.22.0"))
    implementation("com.azure.spring:spring-messaging-azure-servicebus:5.22.0")
    implementation("gg.jte:jte-spring-boot-starter-3:3.2.1")
    implementation("gg.jte:jte:3.2.1")
    jteGenerate("gg.jte:jte-models:3.2.1")

    implementation(project(":awg-mainaccess-web-ui"))

    testImplementation("org.junit.jupiter:junit-jupiter-api:5.12.2")
    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine:5.12.2")
}

jte {
    generate()
    binaryStaticContent.set(true)
    jteExtension("gg.jte.models.generator.ModelExtension")
}

tasks.withType<com.google.cloud.tools.jib.gradle.JibTask>().configureEach {
    notCompatibleWithConfigurationCache("because https://github.com/GoogleContainerTools/jib/issues/3132")
}

tasks.named<org.springframework.boot.gradle.tasks.run.BootRun>("bootRun") {
    args("--spring.profiles.active=local")
}

tasks.test {
    useJUnitPlatform()
}
