<?php $baseUrl = $_SERVER['REQUEST_URI'] . '/'; ?>
<head>
    <title>Test Zone</title>
    <link rel="stylesheet" type="text/css" href="../public/styles.css">
</head>
<body>
    <h2>Test Zone</h2>
    <div
        class="orderable-file-manager" 
        data-listfiles="<?= $baseUrl ?>list.php"
        data-savefile="<?= $baseUrl ?>store.php"
    ></div>
    <script src="../public/demo.js"></script>
</body>
