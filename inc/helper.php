<?php

if( ! defined('ATMOSPHERE_ABSPATH') ) exit;


function get_base_url( $append = false ) {

	$protocol = ( ! empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') 
		? 'https' 
		: 'http';

	$dir = dirname($_SERVER['PHP_SELF']).'/';

	if( $append ) $dir .= $append;

	return $protocol . '://' . $_SERVER['HTTP_HOST'] . $dir;
}
