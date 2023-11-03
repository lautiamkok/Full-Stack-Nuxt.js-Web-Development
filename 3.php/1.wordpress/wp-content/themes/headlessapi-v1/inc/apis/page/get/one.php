<?php
// Create the endpoint for a single page.
// e.g. http://localhost:4000/wp-json/api/v1/page/about
add_action('rest_api_init', function () use ($namespace) {
    $route = 'page/(?P<slug>[a-zA-Z0-9-]+)';
    $args = [
        'methods' => 'GET',
        'callback' => 'fetch_page',
    ];
    register_rest_route($namespace, $route, $args);
});

// Create function to fetch a single page.
function fetch_page($data) {
    // Get the single post by slug/ path.
    // https://developer.wordpress.org/reference/functions/get_page_by_path/
    $post = get_page_by_path($data['slug'], OBJECT, 'page');

    // Return empty array if no data.
    if (!count((array)$post)) {
        return [];
    }

    // https://developer.wordpress.org/reference/functions/get_the_post_thumbnail_url/
    $post->featured_image = get_the_post_thumbnail_url($post->ID);

    // Add SEO and social meta from carbon fields.
    $post->head = create_post_meta($post->ID);

    return $post;
}
