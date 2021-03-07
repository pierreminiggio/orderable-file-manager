<?php

$baseUrl = $_SERVER['REQUEST_URI'] . '/';

$explodedBaseUrl = explode('/', $baseUrl);
array_pop($explodedBaseUrl);
array_pop($explodedBaseUrl);

$parentFolderBaseUrl = implode('/', $explodedBaseUrl) . '/';
$publicFolderUrl = $parentFolderBaseUrl . 'public/';

?>
<head>
    <title>Test Zone</title>
    <link rel="stylesheet" type="text/css" href="<?= $publicFolderUrl ?>styles.css">
</head>
<body>
    <h2>Test Zone</h2>
    <div
        class="orderable-file-manager" 
        data-listfiles="<?= $baseUrl ?>list.php"
        data-savefile="<?= $baseUrl ?>store.php"
    ></div>
    <script src="<?= $publicFolderUrl ?>demo.js"></script>
</body>
