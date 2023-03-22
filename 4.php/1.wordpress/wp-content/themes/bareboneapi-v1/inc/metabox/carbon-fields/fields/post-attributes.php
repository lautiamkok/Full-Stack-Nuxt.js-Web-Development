<?php
use Carbon_Fields\Container;
use Carbon_Fields\Field;

// Post attributes metabox.
add_action('carbon_fields_register_fields', 'crb_attach_post_meta_attributes');
function crb_attach_post_meta_attributes() {
    Container::make('post_meta', __('Post Attributes'))
        ->add_tab(__('Excerpt'), [
            Field::make('rich_text', 'excerpt', __(''))
                ->set_help_text('Set a excerpt to this page. Meta ID: excerpt.')
                ->set_width(100)
                ->set_rows(8)
                ->set_settings([
                    'media_buttons' => false
                ]),
        ])

        ->add_tab(__('Assets'), [
            Field::make('complex', 'assets', '')
                ->set_help_text('Attach local assets to this post. Meta ID: assets.')
                ->set_layout('tabbed-vertical')
                ->add_fields(add_crb_asset_fields(['caption'])),
        ])

        ->add_tab(__('Search Exclude'), [
            Field::make('checkbox', 'search_exclude', '')
                ->set_help_text('Exclude this page from the search results. Meta ID: search_exclude.')
                ->set_option_value('yes')
        ])
        ;
}
