<?php

/**
 * Plugin Name: Syncee For Suppliers
 * Description: Expand your product reach and sell through dropshipping or wholesale globally. Grow [your WooCommerce store's](https://syncee.com/suppliers/) easily.
 * Version: 1.0.21
 * Author: Syncee
 * Author URI: https://syncee.co
 *
 * @package Syncee
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

// Define constants.
define( 'SYNCEE_SUPPLIER_PLUGIN_VERSION', '1.0.21' );

//DEMO
//define( 'SYNCEE_SUPPLIER_URL', 'https://demo.v5.syncee.io' );
//define( 'SYNCEE_SUPPLIER_INSTALLER_URL', 'https://installer.v5.syncee.io' );

//STAGE
define( 'SYNCEE_SUPPLIER_URL', 'https://app.syncee.co' );
define( 'SYNCEE_SUPPLIER_INSTALLER_URL', 'https://installer.syncee.co' );

define( 'SYNCEE_SUPPLIER_PLUGIN_DIR', untrailingslashit( plugin_dir_path( __FILE__ ) ) );
define( 'SYNCEE_SUPPLIER_REST_PATH', '/wp-json/syncee/supplier/v1/' );

include 'SynceeSupplier.php';
