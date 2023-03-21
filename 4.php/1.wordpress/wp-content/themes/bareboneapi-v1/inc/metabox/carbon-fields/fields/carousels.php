<?php
use Carbon_Fields\Container;
use Carbon_Fields\Field;

// Carousels metabox.
add_action('carbon_fields_register_fields', 'crb_attach_post_meta_carousels');
function crb_attach_post_meta_carousels() {
    Container::make('post_meta', __('Carousels'))
        ->where('post_id', 'NOT IN', [get_option('page_on_front')])
        ->add_fields(add_crb_album_fields(
            name: 'carousel', 
            id: 'carousels', 
            options: ['caption']
        ));
}

// Carousels metabox - home only.
add_action('carbon_fields_register_fields', 'crb_attach_post_meta_carousels_home_only');
function crb_attach_post_meta_carousels_home_only() {
    $id = 'home_carousels';
    $options = ['associate'];
    Container::make('post_meta', __('Carousels'))
        ->where('post_id', 'IN', [get_option('page_on_front')])
        ->add_fields(add_crb_album_fields(
            name: 'carousel', 
            id: 'home_carousels', 
            options: ['associate']
        ));
}
