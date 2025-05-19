import com.github.gradle.node.yarn.task.YarnTask

description = "awg-web-services"

plugins {
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

    args.set(listOf("run", "build"))
    inputs.files("../../tsconfig.base.json")
    inputs.files("package.json", "package-lock.json", "tsconfig.json", "vite.config.ts")
    inputs.files(fileTree("src"))
    outputs.dir("${project.projectDir}/dist")
}

tasks.register("build") {
    dependsOn("yarnBuild")
}
