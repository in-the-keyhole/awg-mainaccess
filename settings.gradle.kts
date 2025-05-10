rootProject.name = "awg-mainaccess"

include(":awg-mainaccess-web")
include(":awg-mainaccess-chart")

project(":awg-mainaccess-web").projectDir = file("src/awg-mainaccess-web")
project(":awg-mainaccess-chart").projectDir = file("src/awg-mainaccess-chart")

dependencyResolutionManagement {
    repositories {
        mavenCentral()
    }
}

pluginManagement {

}
