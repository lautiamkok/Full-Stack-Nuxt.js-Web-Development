<?php
// Create the endpoint for the main navigation.
// e.g. http://localhost:4000/wp-json/api/v1/siteinfo
add_action('rest_api_init', function () use ($namespace) {
    $route = 'siteinfo';
    $args = [
        'methods' => 'GET',
        'callback' => 'create_siteinfo',
    ];
    register_rest_route($namespace, $route, $args);
});

// Create function to fetch site menu.
function create_siteinfo ($data) {
    $logo = carbon_get_theme_option('logo');
    if ($logo) {
         $logo = get_asset_data(carbon_get_theme_option('logo'));
    }

    $logos = carbon_get_theme_option('logos');
    if (count((array)$logos) > 0) {
        foreach ($logos as $key => &$image) {
            $image = array_merge($image, get_asset_data($image['id']));
        }
    }

    $favicon = carbon_get_theme_option('favicon');
    if ($favicon) {
         $favicon = get_asset_data(carbon_get_theme_option('favicon'));
    }

    $open_graph = carbon_get_theme_option('open_graph');
    if ($open_graph) {
         $open_graph = reset($open_graph);
    }

    $siteinfo = [
        // WordPress':
        'title' => get_bloginfo('name'),

        // Carbon Field's:
        'company' => carbon_get_theme_option('company'),
        'tagline' => carbon_get_theme_option('tagline'),
        'description' => carbon_get_theme_option('description'),
        'keywords' => carbon_get_theme_option('keywords'),
        'telephone' => carbon_get_theme_option('telephone'),
        'email' => carbon_get_theme_option('email'),
        'address' => carbon_get_theme_option('address'),
        'opening_hours' => carbon_get_theme_option('opening_hours'),
        'copyright' => carbon_get_theme_option('copyright'),
        'credits' => carbon_get_theme_option('credits'),
        'logo' => $logo,
        'logos' => $logos,
        'favicon' => $favicon,
        'open_graph' => $open_graph,
        'social_profiles' => carbon_get_theme_option('social_profiles')
    ];

    return $siteinfo;
}
