import com.github.gradle.node.yarn.task.YarnTask

description = "awg-mainaccess-web-ui-lib"

plugins {
    id("com.github.node-gradle.node") version "7.1.0"
}

node {
    download = false
    fastNpmInstall = true
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
    dependsOn(":awg-web-ui-components:yarnBuild");
    dependsOn(":awg-web-ui-styles:yarnBuild");
    dependsOn(":awg-web-services:yarnBuild");

    args.set(listOf("run", "build"))
    inputs.files("../../tsconfig.base.json")
    inputs.files("package.json", "package-lock.json", "tsconfig.json", "vite.config.ts")
    inputs.files(fileTree("src"))
    inputs.files(fileTree("public"))
    inputs.files(fileTree(project(":awg-web-ui-components").layout.projectDirectory.file("dist")))
    inputs.files(fileTree(project(":awg-web-ui-styles").layout.projectDirectory.file("dist")))
    inputs.files(fileTree(project(":awg-web-services").layout.projectDirectory.file("dist")))
    outputs.dir("${project.projectDir}/dist")
}

tasks.register("build") {
    dependsOn("yarnBuild")
}
