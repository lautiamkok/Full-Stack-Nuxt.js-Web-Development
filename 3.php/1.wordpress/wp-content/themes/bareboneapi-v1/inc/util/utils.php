<?php
// Rules: Function names use underscores between words, while class names use
// both the camelCase and PascalCase rules.
// https://www.php.net/manual/en/userlandnaming.rules.php

// Get the url of any attachment, image, file, video, etc.
// https://developer.wordpress.org/reference/functions/wp_get_attachment_url/
function get_asset_url($attachment_id) {
    return wp_get_attachment_url($attachment_id);
}

// Get the image by different sizes: medium, large, medium_large, thumbnail.
// https://developer.wordpress.org/reference/functions/wp_get_attachment_image_src/
function get_image_url($attachment_id, $size = '') {
    $data = wp_get_attachment_image_src($attachment_id, $size);
    if (!is_countable($data)) {
        return false;
    }
    return $data[0];
}

// Get asset (image, file, video, etc) data and its sizes (image only).
// https://developer.wordpress.org/reference/functions/wp_get_attachment_metadata/
function get_asset_data($attachment_id) {
    if (!$attachment_id) {
        return false;
    }
    $data = wp_get_attachment_metadata($attachment_id);
    if (!$data) {
        return false;
    }
    $uploads_baseurl = wp_upload_dir()['baseurl'];

    // Push more keys to the data.
    $data['url'] = $uploads_baseurl . '/' . $data['file'];
    $data['mime_type'] = $data['mime_type'] ?? get_post_mime_type($attachment_id);

    // Push the `url` key to the sizes (image only).
    if ($data['sizes']) {
        foreach($data['sizes'] as $key => &$size) {
            // Change the 'mime-type' default to 'mime_type' so that it is
            // consistent with other assets, such as videos..
            $size['mime_type'] = $size['mime-type'];
            unset($size['mime-type']);

            $size['url'] = $uploads_baseurl . '/' . $data['file'];
        }
    }
    return $data;
}
