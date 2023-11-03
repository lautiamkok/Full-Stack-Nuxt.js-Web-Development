<?php
// Create the endpoint for fetching projects.
// $ curl -d "page_number=1&posts_per_page=6" -X POST http://localhost:4000/wp-json/api/v1/projects/
add_action('rest_api_init', function () use ($namespace) {
    $route = 'projects/';
    $args = [
        'methods' => 'POST',
        'callback' => 'fetch_projects',
    ];
    register_rest_route($namespace, $route, $args);
});

// Create function to fetch projects.
function fetch_projects($data) {
    $paged = $data['page_number'] ? $data['page_number'] : 1;
    $posts_per_page = $data['posts_per_page'] ? $data['posts_per_page'] : 6;
    $count_only = $data['count_only'] ? $data['count_only'] : false;
    $post_type = 'project';

    // Set the arguments for the query.
    $args = [
        'post_type' => $post_type,
        'post_status' => ['publish'],
        'posts_per_page' => $posts_per_page,
        'paged' => $paged,
        'orderby' => 'date'
    ];

    // https://developer.wordpress.org/reference/functions/get_posts/
    $posts = get_posts($args);

    // Return [] if no post.
    if (empty($posts)) {
        return [];
    }

    // https://developer.wordpress.org/reference/functions/wp_count_posts/
    $total = wp_count_posts($post_type);
    if ($count_only) {
        return $total->publish;
    }
    $total_max_pages = ceil($total->publish / $posts_per_page);

    // Loop each post and push other sub data.
    foreach ($posts as &$post) {
        // Add excerpt from carbon fields.
        $post->excerpt = wpautop(carbon_get_post_meta($post->ID, 'excerpt'));

        // https://developer.wordpress.org/reference/functions/get_the_post_thumbnail_url/
        // https://codex.wordpress.org/Post_Thumbnails#Thumbnail_Sizes
        $post->thumbnail = get_the_post_thumbnail_url($post->ID, $size = 'thumbnail');

        // Use this method for local categories.
        // https://developer.wordpress.org/reference/functions/get_the_terms/
        $post->categories = get_the_terms($post->ID, 'project-category');

        // Use this method for global categories.
        // https://developer.wordpress.org/reference/functions/get_the_category/
        // $post->categories = get_the_category($post->ID);
    }

    return [
        'items' => $posts,
        'total_pages' => $total_max_pages,
        'current_page' => (int) $paged,
        'next_page' => (int) $paged === (int) $total_max_pages ? null : $paged + 1,
        'prev_page' => (int) $paged === 1 ? null : $paged - 1,
    ];
}
