<?php
use Carbon_Fields\Container;
use Carbon_Fields\Field;

// Carousels metabox.
add_action('carbon_fields_register_fields', 'crb_attach_post_meta_carousels');
function crb_attach_post_meta_carousels () {
    Container::make('post_meta', __('Carousels'))
        ->add_fields([
            Field::make('complex', 'carousels', '')
                ->set_help_text('Use this section to add sets of carousel images.')
                ->set_layout('tabbed-horizontal')
                ->add_fields([
                    Field::make('text', 'title', __('Title'))
                        ->set_help_text('Set a title to this set of carousel.')
                        ->set_width(100),

                    Field::make('rich_text', 'description', __('Description'))
                        ->set_help_text('Set a description to this set of carousel.')
                        ->set_width(100)
                        ->set_rows(8)
                        ->set_settings(array(
                            'media_buttons' => false
                       )),

                    Field::make('complex', 'images', 'Images')
                        ->set_layout('tabbed-vertical')
                        ->add_fields(add_crb_image_group()),
                ]),
        ]);
}
