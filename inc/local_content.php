<?php

if( ! defined('ATMOSPHERE_ABSPATH') ) exit;


function get_local_content() {

	$directory = ATMOSPHERE_ABSPATH.'content';
	
	$baseLength = strlen($directory) + 1;

	$iterator = new RecursiveIteratorIterator(
		new RecursiveDirectoryIterator($directory, 
			RecursiveDirectoryIterator::SKIP_DOTS | 
			RecursiveDirectoryIterator::FOLLOW_SYMLINKS
		),
		RecursiveIteratorIterator::LEAVES_ONLY
	);

	$result = [];

	foreach( $iterator as $file ) {

		if( $file->getExtension() !== 'mp3' ) {
			continue;
		}

		$fullPath = $file->getPathname();
		$relativePath = substr($fullPath, $baseLength);
		$dirPath = $file->getPath();
		$baseName = $file->getBasename('.mp3');

		$pngPath = $dirPath . '/' . $baseName . '.png';
		$jpgPath = $dirPath . '/' . $baseName . '.jpg';

		$thumbnail = false;
		if( file_exists($pngPath) ) {
			$thumbnail = substr($pngPath, $baseLength);
		} elseif( file_exists($jpgPath) ) {
			$thumbnail = substr($jpgPath, $baseLength);
		}

		$result[] = [
			'name' => $baseName,
			'mp3' => $relativePath,
			'thumbnail' => $thumbnail
		];
	}

	return $result;
}
