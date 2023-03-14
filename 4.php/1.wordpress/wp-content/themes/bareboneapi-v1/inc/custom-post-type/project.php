<?php
/**
 * Create custom content/post type: project.
 * https://codex.wordpress.org/Function_Reference/register_post_type
 * https://developer.wordpress.org/reference/functions/register_post_type/
 */
add_action('init', 'create_project_post_type');
function create_project_post_type () {
    $args = [
        'labels' => [
            'name' => __('Project (Pages)'),
            'singular_name' => __('Project'),
            'all_items' => 'All Projects'
        ],
        'public' => true,
        'show_ui' => true,
        'capability_type' => 'page',
        'hierarchical' => true,
        // 'rewrite' => array('slug' => 'try/project'),
        'query_var' => true,
        'menu_icon' => 'dashicons-star-filled',
        'supports' => [
            'title',
            'editor',
            'excerpt',
            // 'trackbacks',
            // 'custom-fields',
            // 'comments',
            // 'revisions',
            // 'author',
            'thumbnail',
            'page-attributes',
        ],

        // Add global category & tag.
        'taxonomies'  => [
            // 'category',
            // 'post_tag'
        ],
    ];
    register_post_type('project', $args);
}

/**
 * Create a new set of categories for work post type specifically.
 * https://codex.wordpress.org/Function_Reference/register_taxonomy
 * https://developer.wordpress.org/reference/functions/register_taxonomy/
 */
add_action('init', 'create_project_categories');
function create_project_categories() {
    $args = [
        'label' => __('Categories'),
        'has_archive' =>  true,
        'hierarchical' => true,
        'rewrite' => [
            'slug' => 'project',
            'with_front' => false
        ],
    ];
    $postTypes = ['project'];
    $taxonomy = 'project-category';
    register_taxonomy($taxonomy, $postTypes, $args);
}
