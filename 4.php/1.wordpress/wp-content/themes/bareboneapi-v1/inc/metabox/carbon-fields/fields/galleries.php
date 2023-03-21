<?php
use Carbon_Fields\Container;
use Carbon_Fields\Field;

// Galleries metabox.
add_action('carbon_fields_register_fields', 'crb_attach_post_meta_galleries');
function crb_attach_post_meta_galleries() {
    Container::make('post_meta', __('Galleries'))
        ->add_fields(add_crb_album_fields(
            name: 'gallery', 
            id: 'galleries', 
            options: ['caption']
        ));
}
