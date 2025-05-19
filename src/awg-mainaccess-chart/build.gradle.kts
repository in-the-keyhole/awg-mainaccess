description = "awg-mainaccess-chart"

plugins {
    id("com.citi.helm") version "2.2.0"
    id("buildlogic.common")
}

helm {
    lint {
        enabled = false
    }
}
