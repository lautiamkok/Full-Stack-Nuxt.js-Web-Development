<?php
use Carbon_Fields\Container;
use Carbon_Fields\Field;

// Related Posts metabox.
add_action('carbon_fields_register_fields', 'crb_attach_post_meta_related_posts');
function crb_attach_post_meta_related_posts() {
    Container::make('post_meta', __('Related Posts'))
        ->where('post_id', 'NOT IN', [
            get_option('page_on_front')
        ])

        ->add_fields([
            Field::make('complex', 'related_posts', '')
                ->set_help_text('Use this section to add sets of related posts. Meta ID: related_posts.')
                ->set_layout('tabbed-horizontal')
                ->add_fields([
                    Field::make('text', 'title', __('Title'))
                        ->set_help_text('Set a title to this set of related posts.' )
                        ->set_width(100),

                    Field::make('rich_text', 'description', __('Description'))
                        ->set_help_text('Set a description to this set of related posts.')
                        ->set_width(100)
                        ->set_rows(8)
                        ->set_settings([
                            'media_buttons' => false
                        ]),

                    Field::make('association', 'items', __('Related Posts'))
                        ->set_help_text('Set items to this set of related posts.')
                        ->set_min(1)
                        ->set_types(set_all_available_post_types()),

                    Field::make('association', 'associate', __('Associate'))
                        ->set_help_text('Set a link to this set of related posts.')
                        ->set_max(1)
                        ->set_types(set_all_available_post_types()),
                ]),
        ]);
}
