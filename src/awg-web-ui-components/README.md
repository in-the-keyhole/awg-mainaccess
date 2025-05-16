# ui-components

Generic components designed for reuse across libraries. Includes:

-   Low level building blocks like cards, buttons, form inputs
-   Common aggregated components, like the navigation header
-   Common pages, like error reporting.

App/Library specific components should not be placed in this project. It is for low-level reusable assets only.
Some components in this library may have dependencies on `awg/services`, but should not rely on components from other libraries. Service dependencies should be clearly documented.

Components exported from this project should be prefixed with `Awg`.

This project contains Jest tests for integration and unit tests.
