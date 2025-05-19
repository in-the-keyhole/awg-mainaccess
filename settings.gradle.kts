rootProject.name = "awg-mainaccess"

include(":awg-mainaccess-chart")
include(":awg-mainaccess-idp")
include(":awg-mainaccess-web")
include(":awg-mainaccess-web-ui")
include(":awg-mainaccess-web-ui-lib")
include(":awg-web-ui-components")
include(":awg-web-ui-styles")
include(":awg-web-services")

project(":awg-mainaccess-chart").projectDir = file("src/awg-mainaccess-chart")
project(":awg-mainaccess-idp").projectDir = file("src/awg-mainaccess-idp")
project(":awg-mainaccess-web").projectDir = file("src/awg-mainaccess-web")
project(":awg-mainaccess-web-ui").projectDir = file("src/awg-mainaccess-web-ui")
project(":awg-mainaccess-web-ui-lib").projectDir = file("src/awg-mainaccess-web-ui-lib")
project(":awg-web-ui-components").projectDir = file("src/awg-web-ui-components")
project(":awg-web-ui-styles").projectDir = file("src/awg-web-ui-styles")
project(":awg-web-services").projectDir = file("src/awg-web-services")

dependencyResolutionManagement {
    repositories {
        mavenCentral()
    }
}

pluginManagement {


}
