<?php

$files = [];
$scannedFiles = scandir(__DIR__ . '/files');
foreach ($scannedFiles as $scannedFile) {
	if ($scannedFile !== '.' && $scannedFile !== '..') {
		$file = (object)[
			'id' => hash('tiger192,3', $scannedFile),
			'name' => $scannedFile,
			'url' => 'files/' . $scannedFile,
			'delete_url' => 'delete.php?file=' . $scannedFile
		];
		$files[] = $file;
	}
}

echo json_encode($files);

