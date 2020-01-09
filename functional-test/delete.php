<?php

$file = $_GET['file'];
unlink(__DIR__ . '/files/' . $file);

echo json_encode(['success' => 1, 'file' => $file]);