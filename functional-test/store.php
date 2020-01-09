<?php

$file = $_FILES['file'];
rename($file['tmp_name'], __DIR__ . '/files/' . $file['name']);

echo json_encode(['success' => 1, 'file' => $file['name']]);