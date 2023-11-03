<?php
// Create the endpoint for a single project.
// e.g. http://localhost:4000/wp-json/api/v1/project/<slug>
add_action('rest_api_init', function () use ($namespace) {
    $route = 'project/(?P<slug>[a-zA-Z0-9-]+)';
    $args = [
        'methods' => 'GET',
        'callback' => 'fetch_project',
    ];
    register_rest_route($namespace, $route, $args);
});

// Create function to fetch a single project.
function fetch_project($data) {
    // Get the single post by slug/ path.
    // https://developer.wordpress.org/reference/functions/get_page_by_path/
    $post = get_page_by_path($data['slug'], OBJECT, 'project');

    // Return empty array if no data.
    if (!count((array)$post)) {
        return [];
    }

    // https://developer.wordpress.org/reference/functions/wpautop/
    // Turn line breaks into paragraph.
    $post->post_content = wpautop($post->post_content);

    // Push other sub data.
    // Use this method for local categories.
    // https://developer.wordpress.org/reference/functions/get_the_terms/
    $post->categories = get_the_terms($post->ID, 'project-category');

    // Add SEO and social meta from carbon fields.
    $post->head = create_post_meta($post->ID);

    // Add carousels from carbon fields.
    $post->carousels = carbon_get_post_meta($post->ID, 'carousels');
    if (count((array)$post->carousels) > 0) {
        foreach ($post->carousels as $key => &$carousel) {
            if ($carousel['_type'] === 'gallery') {
                foreach ($carousel['gallery'] as $key => &$asset) {
                    $asset_id = $asset;
                    $asset = get_asset_data($asset_id);
                    $asset['id'] = $asset_id;
                }
                $carousel['assets'] = $carousel['gallery'];
                unset($carousel['gallery']);
            }
            if ($carousel['_type'] === 'assets') {
                foreach ($carousel['assets'] as $key => &$asset) {
                    $asset['caption'] = wpautop($asset['caption'] ?? '');
                    $asset = array_merge($asset, get_asset_data($asset['id']));
                }
            }
            if ($carousel['_type'] === 'complex') {
                $carousel['description'] = wpautop($carousel['description']);
                if (count($carousel['assets']) > 0) {
                    // Only take the first item from the array.
                    $carousel['assets'] = $carousel['assets'][0];
                    unset($carousel['assets'][0]);

                    // Set asset data.
                    if ($carousel['assets']['_type'] === 'complex') {
                        foreach ($carousel['assets']['complex'] as $key => &$asset) {
                            $asset['caption'] = wpautop($asset['caption'] ?? '');
                            $asset = array_merge($asset, get_asset_data($asset['id']));
                        }
                        $carousel['assets'] = $carousel['assets']['complex'];
                    }
                    if ($carousel['assets']['_type'] === 'gallery') {
                        foreach ($carousel['assets']['gallery'] as $key => &$asset) {
                            $asset_id = $asset;
                            $asset = get_asset_data($asset_id);
                            $asset['id'] = $asset_id;
                        }
                        $carousel['assets'] = $carousel['assets']['gallery'];
                    }
                    unset($carousel['assets']['_type']);
                }
            }
        }
    }

    // Add images from carbon fields.
    $post->assets = carbon_get_post_meta($post->ID, 'assets');
    if (count((array)$post->assets) > 0) {
        foreach ($post->assets as $key => &$asset) {
            $asset['caption'] = wpautop($asset['caption'] ?? '');
            $asset = array_merge($asset, get_asset_data($asset['id']));
        }
    }

    // Use this method for global categories.
    // https://developer.wordpress.org/reference/functions/get_the_category/
    // $post->categories = get_the_category($post->ID);

    return $post;
}
