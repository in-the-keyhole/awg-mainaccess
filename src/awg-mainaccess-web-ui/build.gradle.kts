import com.github.gradle.node.npm.task.NpmTask

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
    outputs.dir("${project.projectDir}/dist")
}

sourceSets {
    java {
        main {
            resources {
                srcDir(buildTask)
            }
        }
    }
}

tasks.withType<ProcessResources> {

}
