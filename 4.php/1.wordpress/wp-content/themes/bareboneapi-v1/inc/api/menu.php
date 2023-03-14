<?php
// Create the endpoint for the main navigation.
// e.g. http://localhost:4000/wp-json/api/v1/menus/menu-main
add_action('rest_api_init', function () use ($namespace) {
    $route = 'menus/(?P<name>[a-zA-Z0-9-]+)';
    $args = [
        'methods' => 'GET',
        'callback' => 'fetch_menu',
    ];
    register_rest_route($namespace, $route, $args);
});

// Create function to fetch site menu.
function fetch_menu ($data) {
    $name = $data['name'] ? $data['name'] : 'menu-main';

    // Get the menu items by menu name.
    // https://developer.wordpress.org/reference/functions/wp_get_nav_menu_items/
    $menu_items = wp_get_nav_menu_items($name);

    // Return [] if no post.
    if (empty($menu_items)) {
        return [];
    }

    // Loop each item and push other data.
    // https://developer.wordpress.org/reference/functions/url_to_postid/
    // https://developer.wordpress.org/reference/functions/get_post/
    foreach ($menu_items as &$menu_item) {
        $post_id = url_to_postid($menu_item->url);
        $post = get_post($post_id);
        $menu_item->slug = $post->post_name;
    }

    return $menu_items;
}
