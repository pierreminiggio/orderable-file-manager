<?php

$splitedCurrentUrl = explode('/', $_SERVER['REQUEST_URI']);
array_pop($splitedCurrentUrl);

$baseUrl = implode('/', $splitedCurrentUrl) . '/';

$files = [];
$folderPath = __DIR__ . DIRECTORY_SEPARATOR . 'files';
if (! file_exists($folderPath)) {
    mkdir($folderPath, 0777);
}
$scannedFiles = scandir($folderPath);
foreach ($scannedFiles as $scannedFile) {
    if ($scannedFile !== '.' && $scannedFile !== '..') {
        $file = (object)[
            'id' => hash('tiger192,3', $scannedFile),
            'name' => $scannedFile,
            'url' => $baseUrl . 'files/' . $scannedFile,
            'delete_url' => $baseUrl . 'delete.php?file=' . $scannedFile
        ];
        $files[] = $file;
    }
}

echo json_encode($files);
