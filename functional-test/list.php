<?php

$files = [];
$scannedFiles = scandir('files');
foreach ($scannedFiles as $scannedFile) {
	if ($scannedFile !== '.' && $scannedFile !== '..') {
		$file = (object)[
			'id' => $scannedFile,
			'name' => $scannedFile,
			'url' => 'files/' . $scannedFile,
			'delete_url' => 'delete.php?file=' . $scannedFile
		];
		$files[] = $file;
	}
}

echo json_encode($files);

