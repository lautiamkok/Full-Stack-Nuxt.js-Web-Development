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
function fetch_project ($data) {
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
            $carousel['description'] = wpautop($carousel['description']);
            if (count($carousel['images']) > 0) {
                foreach ($carousel['images'] as $key => &$image) {
                    $image['description'] = wpautop($image['description']);
                    $image['data'] = get_image_data($image['id']);
                }
            }
        }
    }

    // Add images from carbon fields.
    $post->images = carbon_get_post_meta($post->ID, 'images');
    if (count((array)$post->images) > 0) {
        foreach ($post->images as $key => &$image) {
            $image['description'] = wpautop($image['description']);
            $image['data'] = get_image_data($image['id']);
        }
    }

    // Use this method for global categories.
    // https://developer.wordpress.org/reference/functions/get_the_category/
    // $post->categories = get_the_category($post->ID);

    return $post;
}
