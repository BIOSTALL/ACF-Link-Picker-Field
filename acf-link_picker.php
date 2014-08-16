<?php

/*
Plugin Name: Advanced Custom Fields: Link Picker
Plugin URI: http://biostall.com
Description: Adds an Advanced Custom Field field that allows the selection of a link utilising the WordPress link picker modal dialog
Version: 1.0.1
Author: Steve Marks (BIOSTALL)
Author URI: http://biostall.com
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/




// 1. set text domain
// Reference: https://codex.wordpress.org/Function_Reference/load_plugin_textdomain
load_plugin_textdomain( 'acf-link_picker', false, dirname( plugin_basename(__FILE__) ) . '/lang/' ); 




// 2. Include field type for ACF5
// $version = 5 and can be ignored until ACF6 exists
function include_field_types_link_picker( $version ) {
	
	include_once('acf-link_picker-v5.php');
	
}

add_action('acf/include_field_types', 'include_field_types_link_picker');	




// 3. Include field type for ACF4
function register_fields_link_picker() {
	
	include_once('acf-link_picker-v4.php');
	
}

add_action('acf/register_fields', 'register_fields_link_picker');	



	
?>