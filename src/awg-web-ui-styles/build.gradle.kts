import com.github.gradle.node.npm.task.NpmTask

description = "awg-web-ui-styles"

plugins {
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

    args.set(listOf("run", "build"))
    inputs.files("package.json", "package-lock.json", "tsconfig.json", "tsconfig.app.json", "vite.config.ts")
    inputs.files(fileTree("src"))
    outputs.dir("${project.projectDir}/dist")
}

tasks.register("build") {
    dependsOn("npmBuild")
}
