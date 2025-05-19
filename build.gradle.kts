description = "awg-mainaccess"

plugins {
    id("buildlogic.common")
    id("distribution")
}

distributions {
    main {
        contents {
            from()
        }
    }
}

tasks.register<Copy>("distIdp") {
    val task = project(":awg-mainaccess-idp").tasks.named("jibBuildTar")
    dependsOn(task)

    from(project(":awg-mainaccess-idp").layout.buildDirectory.get().file("jib-image.tar"))
    rename { "awg-mainaccess-idp.tar" }
    into(layout.projectDirectory.dir("dist").dir("images"))
}

tasks.register<Copy>("distWeb") {
    val task = project(":awg-mainaccess-web").tasks.named("jibBuildTar")
    dependsOn(task)

    from(project(":awg-mainaccess-web").layout.buildDirectory.get().file("jib-image.tar"))
    rename { "awg-mainaccess-web.tar" }
    into(layout.projectDirectory.dir("dist").dir("images"))
}

tasks.register<Copy>("distChart") {
    val task = project(":awg-mainaccess-chart").tasks.named("helmPackage");
    dependsOn(task)
    from(project(":awg-mainaccess-chart").layout.buildDirectory.get().dir("helm").dir("charts")) {
        include("awg-mainaccess-chart-*.tgz")
    }
    into(layout.projectDirectory.dir("dist").dir("charts"))
}

tasks.register<Copy>("dist") {
    dependsOn("distIdp")
    dependsOn("distWeb")
    dependsOn("distChart")
}
