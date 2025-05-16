import com.github.gradle.node.npm.task.NpmTask

description = "awg-mainaccess-web-ui"

plugins {
    java
    id("com.github.node-gradle.node") version "7.1.0"
}

node {
    download = false
}

val lintTask = tasks.register<NpmTask>("npmLint") {
    dependsOn(tasks.npmInstall)

    args.set(listOf("run", "lint"))
    outputs.upToDateWhen { true }
}

val buildTask = tasks.register<NpmTask>("npmBuild") {
    dependsOn(tasks.npmInstall)

    args.set(listOf("run", "build"))
    inputs.files("package.json", "package-lock.json", "tsconfig.json", "tsconfig.app.json", "vite.config.ts")
    inputs.dir("src")
    inputs.dir("public")
    inputs.dir(fileTree("node_modules").exclude(".cache"))
    outputs.dir("${project.projectDir}/dist")
}

tasks.withType<ProcessResources> {
    dependsOn(buildTask)

    from("${project.projectDir}/dist") {
        include(listOf("index.js", "index.js.map", "index.css", "favicon.png"))
        into("public")
    }
}
