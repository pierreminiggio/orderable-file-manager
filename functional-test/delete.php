<?php

$file = __DIR__ . '/files/' . $_GET['file'];

if (! file_exists($file)) {
    echo json_encode(['error' => 1]);
    die();
}

unlink($file);

echo json_encode(['success' => 1]);
