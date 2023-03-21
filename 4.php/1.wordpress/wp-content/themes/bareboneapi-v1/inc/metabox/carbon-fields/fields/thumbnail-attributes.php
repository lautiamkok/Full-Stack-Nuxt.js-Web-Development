<?php
use Carbon_Fields\Container;
use Carbon_Fields\Field;

// Thumbnail attributes metabox.
add_action('carbon_fields_register_fields', 'crb_attach_post_meta_thumbnail_attributes');
function crb_attach_post_meta_thumbnail_attributes() {
    Container::make('post_meta', __('Thumbnail Attributes'))
        ->add_tab(__('Title'), [
             Field::make('text', 'thumbnail_title', __(''))
                ->set_help_text('Set a plain-text title to the thumbnail. Meta ID: thumbnail_title.')
                ->set_width(100),
        ])

        ->add_tab(__('Description'), [
            Field::make('rich_text', 'thumbnail_description', __(''))
                ->set_help_text('Set a rich-text description to the thumbnail. Meta ID: thumbnail_description.')
                ->set_rows(8)
                ->set_settings([
                    'media_buttons' => false
                ]),
        ])

        ->add_tab(__('Caption'), [
            Field::make('rich_text', 'thumbnail_caption', __(''))
                ->set_help_text('Set a rich-text caption to the thumbnail. Meta ID: thumbnail_caption.')
                ->set_rows(8)
                ->set_settings([
                    'media_buttons' => false
                ]),
        ])

        ->add_tab(__('Credit'), [
            Field::make('rich_text', 'thumbnail_credit', __(''))
                ->set_help_text('Set a rich-text credit to the thumbnail. Meta ID: thumbnail_credit.')
                ->set_rows(8)
                ->set_settings([
                    'media_buttons' => false
                ]),
        ])

        ->add_tab(__('Size'), [
            Field::make('select', 'thumbnail_size', __(''))
                ->set_help_text('Set a grid size to the thumbnail for large screens. Meta ID: thumbnail_size.')
                ->set_options(set_grid_size_options()),
        ])

        ->add_tab(__('Filter'), [
            Field::make('color', 'thumbnail_filter', '')
                ->set_help_text('Set a transparent colour layer over the thumbnail. Meta ID: thumbnail_filter.')
                ->set_alpha_enabled(true),
        ])

        ;
}
