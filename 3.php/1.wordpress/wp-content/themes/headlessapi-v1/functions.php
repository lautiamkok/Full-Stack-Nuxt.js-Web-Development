<?php
/**
 * Barebone API functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage Barebone API
 * @since 1.0
 * @version 1.0
 */

// Enable menu support.
// https://developer.wordpress.org/reference/functions/add_theme_support/
register_nav_menus([
    'primary-menu' => __('Primary Menu'),
    'secondary-menu' => __('Secondary Menu')
]);

// Enable post thumbnail support.
// https://codex.wordpress.org/Post_Thumbnails
if (function_exists('add_theme_support')) {
    add_theme_support('post-thumbnails');
}

// Utils.
include 'inc/utils/utils.php';
include 'inc/utils/metainfo.php';

// Install metaboxes.
use Carbon_Fields\Container;
use Carbon_Fields\Field;

add_action('after_setup_theme', 'crb_load');
function crb_load() {
    require_once('vendor/autoload.php');
    \Carbon_Fields\Carbon_Fields::boot();
}

include 'inc/metaboxes/carbon-fields/config.php';
include 'inc/metaboxes/carbon-fields/commons.php';
include 'inc/metaboxes/carbon-fields/fields/theme-options.php';
include 'inc/metaboxes/carbon-fields/fields/metainfo.php';
include 'inc/metaboxes/carbon-fields/fields/thumbnail-attributes.php';
include 'inc/metaboxes/carbon-fields/fields/post-attributes.php';
include 'inc/metaboxes/carbon-fields/fields/related-posts.php';
include 'inc/metaboxes/carbon-fields/fields/carousels.php';
include 'inc/metaboxes/carbon-fields/fields/galleries.php';
include 'inc/metaboxes/carbon-fields/fields/content-blocks.php';

// Include custom post types.
include 'inc/custom-post-types/project.php';

// Include APIs.
include 'inc/apis/commons.php';
include 'inc/apis/siteinfo.php';
include 'inc/apis/menu.php';
include 'inc/apis/project/post/many.php';
include 'inc/apis/project/get/one.php';
include 'inc/apis/page/get/one.php';

// Disable Gutenberg Completely
// disable for posts
add_filter('use_block_editor_for_post', '__return_false', 10);

// disable for post types
add_filter('use_block_editor_for_post_type', '__return_false', 10);

// Limit the Image Upload Size.
function whero_limit_image_size($file) {
    // Calculate the image size in KB.
    $image_size = $file['size'] / 1024;

    // File size limit in KB.
    $limit = 2048; // 2 MB

    // Check if it's an image.
    $is_image = strpos($file['type'], 'image');

    if (($image_size > $limit) && ($is_image !== false)) {
        $file['error'] = 'Your picture is too large. It has to be smaller than '. $limit / 1024 .'MB. Longest dimension must not exceed 1920 pixels, 72dpi.';
    }
    return $file;
}
add_filter('wp_handle_upload_prefilter', 'whero_limit_image_size');
