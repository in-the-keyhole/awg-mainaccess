import com.github.gradle.node.yarn.task.YarnTask

description = "awg-mainaccess-web-ui"

plugins {
    java
    id("com.github.node-gradle.node") version "7.1.0"
}

node {
    download = false
}

val lintTask = tasks.register<YarnTask>("yarnLint") {
    dependsOn("yarn_install")

    args.set(listOf("run", "lint"))
    outputs.upToDateWhen { true }
}

val cleanTask = tasks.register<YarnTask>("yarnClean") {
    dependsOn("yarn_install")

    args.set(listOf("run", "clean"))
    outputs.upToDateWhen { true }
}

val buildTask = tasks.register<YarnTask>("yarnBuild") {
    dependsOn("yarn_install")
    dependsOn(":awg-mainaccess-web-ui-lib:yarnBuild");
    dependsOn(":awg-web-ui-components:yarnBuild");
    dependsOn(":awg-web-ui-styles:yarnBuild");
    dependsOn(":awg-web-services:yarnBuild");

    args.set(listOf("run", "build"))
    inputs.files("../../tsconfig.base.json")
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
    dependsOn("yarnBuild")
}
