<?php

declare(strict_types=1);

namespace NameA\Util;

function getFiles(string $directory): array {
    // Sort in ascending order (default).
    $files = array_diff(scandir($directory), ['.', '..']);
    $allFiles = [];

    foreach ($files as $file) {
        $fullPath = $directory . DIRECTORY_SEPARATOR . $file;
        is_dir($fullPath) ? 
            array_push($allFiles, ...getFiles($fullPath)) : 
            array_push($allFiles, $fullPath);
    }

    return $allFiles;
}
