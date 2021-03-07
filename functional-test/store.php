<?php

$file = $_FILES['file'];

if (! empty($file['error'])) {
    echo json_encode(['error' => $file['error']]);
    die();
}

rename($file['tmp_name'], __DIR__ . DIRECTORY_SEPARATOR . 'files' . DIRECTORY_SEPARATOR . $file['name']);

echo json_encode(['success' => 1, 'file' => $file['name']]);
