@param String basePath
@param String version

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>AWG Main Access</title>
        <base href="${basePath}" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="favicon.png" />
        <link rel="stylesheet" crossorigin href="index.css?v=${version}">
        <script type="module" crossorigin src="index.js?v=${version}"></script>
    </head>

    <body>
        <div id="root"></div>
    </body>

</html>
