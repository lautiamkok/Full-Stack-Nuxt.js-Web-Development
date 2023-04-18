<?php
use Carbon_Fields\Container;
use Carbon_Fields\Field;

function set_bg_options () {
    return [
        'white' => 'White',
        'gray-100' => 'Gray 100'
    ];
}

// Contents metabox.
add_action('carbon_fields_register_fields', 'crb_attach_post_meta_contents');
function crb_attach_post_meta_contents() {
    Container::make('post_meta', __('Content Blocks'))
        // ->where('post_id', 'NOT IN', [get_option('page_on_front')])
        // ->where('post_type', 'IN', ['page'])

        ->add_fields([
            Field::make('complex', 'content_blocks', '')
                ->set_help_text('Set custom contents to this page. Meta ID: content_blocks.')

                ->add_fields('block',  [
                    Field::make('select', 'background', __('Background Colour'))
                        ->set_help_text('Set a background colour to this block. Meta ID: background.')
                        ->set_options(set_bg_options()),

                    // Add field options.
                    Field::make('complex', 'fields', '')
                        ->set_help_text('Add input fields to this block. Meta ID: fields.')

                        ->add_fields('title',  [
                            Field::make('text', 'title', __(''))
                                ->set_help_text('Add a title to this block. Meta ID: title.')
                                ->set_width(100)
                        ])

                        ->add_fields('text',  [
                            Field::make('rich_text', 'text', __(''))
                                ->set_help_text('Add a rich text content to this block. Meta ID: text.')
                                ->set_width(100)
                                ->set_settings([
                                    'media_buttons' => false
                                ]),
                        ])

                        ->add_fields('complex_image',  [
                            Field::make('complex', 'images', __(''))
                                ->set_help_text('Add images to this block. Meta ID: images.')
                                ->set_layout('tabbed-vertical')
                                ->add_fields(add_crb_asset_fields(['image', 'caption'])),
                        ])

                        // Video Only (Media Library)
                        ->add_fields('complex_video',  [
                            Field::make('complex', 'videos', __(''))
                                ->set_help_text('Add videos to this block. Meta ID: videos.')
                                ->set_layout('tabbed-vertical')
                                ->add_fields(add_crb_asset_fields(['video', 'caption']))
                        ])

                        // Video Only (Embed)
                        ->add_fields('complex_video_embed',  [
                            Field::make('complex', 'embed_videos', __(''))
                                ->set_help_text('Add videos to this block. Meta ID: embed_videos.')
                                ->set_layout('tabbed-vertical')
                                ->add_fields(add_crb_asset_fields(['script', 'caption']))
                        ])

                        // Gallery Only
                        ->add_fields('gallery',  [
                            Field::make('media_gallery', 'gallery', __(''))
                                ->set_help_text('Add a gallery (images/videos) to this block. Meta ID: gallery.')
                                ->set_type(['image', 'video']),
                        ])

                        // Image Gallery Only
                        ->add_fields('image_gallery',  [
                            Field::make('media_gallery', 'gallery_images', __(''))
                                ->set_help_text('Add a gallery (images only) to this block. Meta ID: gallery_images.')
                                ->set_type(['image']),
                        ])

                        // Video Gallery Only
                        ->add_fields('video_gallery',  [
                            Field::make('media_gallery', 'gallery_videos', __(''))
                                ->set_help_text('Add a gallery (videos only) to this block. Meta ID: gallery_videos.')
                                ->set_type(['video']),
                        ])

                ])

            
        ]);
}
