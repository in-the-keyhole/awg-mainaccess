import com.github.gradle.node.npm.task.NpmTask

description = "awg-mainaccess-web-ui"

plugins {
    java
    id("com.github.node-gradle.node") version "7.1.0"
}

node {
    download = false
    fastNpmInstall = true
}

val lintTask = tasks.register<NpmTask>("npmLint") {
    dependsOn(tasks.npmInstall)

    args.set(listOf("run", "lint"))
    outputs.upToDateWhen { true }
}

val cleanTask = tasks.register<NpmTask>("npmClean") {
    dependsOn(tasks.npmInstall)

    args.set(listOf("run", "clean"))
    outputs.upToDateWhen { true }
}

val buildTask = tasks.register<NpmTask>("npmBuild") {
    dependsOn(tasks.npmInstall)
    dependsOn(":awg-mainaccess-web-ui-lib:npmBuild");
    dependsOn(":awg-web-ui-components:npmBuild");
    dependsOn(":awg-web-ui-styles:npmBuild");
    dependsOn(":awg-web-services:npmBuild");

    args.set(listOf("run", "build"))
    inputs.files("package.json", "package-lock.json", "tsconfig.json", "tsconfig.app.json", "vite.config.ts")
    inputs.dir("src")
    inputs.dir("public")
    inputs.files(fileTree(project(":awg-mainaccess-web-ui-lib").layout.projectDirectory.file("dist")))
    inputs.files(fileTree(project(":awg-web-ui-components").layout.projectDirectory.file("dist")))
    inputs.files(fileTree(project(":awg-web-ui-styles").layout.projectDirectory.file("dist")))
    inputs.files(fileTree(project(":awg-web-services").layout.projectDirectory.file("dist")))
    outputs.dir("${project.projectDir}/dist")
}

tasks.withType<ProcessResources> {
    dependsOn(buildTask)

    from("${project.projectDir}/dist") {
        include(listOf("index.js", "index.js.map", "index.css", "favicon.png"))
        into("public")
    }
}

tasks.named("build") {
    dependsOn("npmBuild")
}
