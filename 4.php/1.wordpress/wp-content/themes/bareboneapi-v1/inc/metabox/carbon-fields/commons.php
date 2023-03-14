<?php
use Carbon_Fields\Container;
use Carbon_Fields\Field;

// Abstract fields (for image) to be reuse.
function add_crb_image_group($options = []) {
    $fields = [];
    $defaults = [
        'id', 
        'title', 
        'description'
    ];
    $picked = array_merge($defaults, $options);

    $id = Field::make('image', 'id', 'Image')
        ->set_help_text('Upload an image file. Meta ID: id.');

    $title = Field::make('text', 'title', __('Title'))
        ->set_help_text('Set a plain-text title to this image. Meta ID: title.')
        ->set_width(100);

    $description = Field::make('textarea', 'description', __('Description'))
        ->set_help_text('Set a rich-text description to this image. Meta ID: description.')
        ->set_rows(3);

    $caption = Field::make('rich_text', 'caption', __('Caption'))
        ->set_help_text('Set a rich-text caption to this image. Meta ID: caption.')
        ->set_rows(8)
        ->set_settings([
            'media_buttons' => false
        ]);

    $credit = Field::make('rich_text', 'credit', __('Credit'))
        ->set_help_text('Set a rich-text credit to this image.')
        ->set_rows(8)
        ->set_settings([
            'media_buttons' => false
        ]);

    $size = Field::make('select', 'size', __('Size'))
        ->set_help_text('Set a grid size to this image for large screens. Meta ID: size.')
        ->set_options(set_grid_size_options());

    $position = Field::make('select', 'top', __('Top Position'))
        ->set_help_text('Set a top position to this image in percentage.')
        ->set_options(set_percentage_options());

    // https://docs.carbonfields.net/learn/fields/color.html#config-methods
    $filter = Field::make('color', 'filter', 'Filter')
        ->set_help_text('Set a transparent colour layer over this image. Meta ID: filter.')
        ->set_alpha_enabled(true);

    $associate = Field::make('association', 'associate', __('Associate'))
        ->set_help_text('Set a link to this image to a local page.')
        ->set_max(1)
        ->set_types(set_all_available_post_types());

    $remote_url = Field::make('text', 'remote_url', __('Remote URL'))
        ->set_help_text('Set a remote link to this image. Meta ID: remote_url.')
        ->set_width(100);

    if (in_array('id', $picked)) {
        $fields[] = $id;
    }
    if (in_array('title', $picked)) {
        $fields[] = $title;
    }
    if (in_array('description', $picked)) {
        $fields[] = $description;
    }
    if (in_array('caption', $picked)) {
        $fields[] = $caption;
    }
    if (in_array('size', $picked)) {
        $fields[] = $size;
    }
    if (in_array('position', $picked)) {
        $fields[] = $position;
    }
    if (in_array('filter', $picked)) {
        $fields[] = $filter;
    }
    if (in_array('associate', $picked)) {
        $fields[] = $associate;
    }
    if (in_array('remote_url', $picked)) {
        $fields[] = $remote_url;
    }

    return $fields;

    // return [
    //     Field::make('image', 'id', 'Image')
    //         ->set_help_text('Upload an image file. Meta ID: id.'),

    //     Field::make('text', 'title', __('Title'))
    //         ->set_help_text('Set a plain-text title to this image. Meta ID: title.')
    //         ->set_width(100),

    //     Field::make('textarea', 'description', __('Description'))
    //         ->set_help_text('Set a rich-text description to this image. Meta ID: description.')
    //         ->set_rows(4),

    //     Field::make('rich_text', 'caption', __('Caption'))
    //         ->set_help_text('Set a rich-text caption to this image. Meta ID: caption.')
    //         ->set_rows(8)
    //         ->set_settings([
    //             'media_buttons' => false
    //         ]),

    //     Field::make('rich_text', 'credit', __('Credit'))
    //         ->set_help_text('Set a rich-text credit to this image.')
    //         ->set_rows(8)
    //         ->set_settings([
    //             'media_buttons' => false
    //         ]),

    //     Field::make('select', 'top', __('Top Position'))
    //         ->set_help_text('Set a top position to this image in percentage.')
    //         ->set_options(set_percentage_options()),

    //     $size,

    //     // https://docs.carbonfields.net/learn/fields/color.html#config-methods
    //     Field::make('color', 'filter', 'Filter')
    //         ->set_help_text('Set a transparent colour layer over this image. Meta ID: filter.')
    //         ->set_alpha_enabled(true),

    //     Field::make('association', 'associate', __('Associate'))
    //         ->set_help_text('Set a link to this image to a local page.')
    //         ->set_max(1)
    //         ->set_types(set_all_available_post_types()),
        
    //     Field::make('text', 'remote_url', __('Remote URL'))
    //         ->set_help_text('Set a remote link to this image. Meta ID: remote_url.')
    //         ->set_width(100)
    // ];
}

// Abstract fields (for video) to be reuse.
function add_crb_video_embed_group() {
    return [
        Field::make('textarea', 'code', __('Embed Code'))
            ->set_help_text('Set an embed iframe code to this video. Meta ID: code.')
            ->set_rows(4)
            ->set_width(100),

        Field::make('text', 'title', __('Title'))
            ->set_help_text('Set a plain-text title to this video. Meta ID: title.')
            ->set_width(100),

        Field::make('rich_text', 'description', __('Description'))
            ->set_help_text('Set a rich-text description to this video. Meta ID: description.')
            ->set_rows(8)
            ->set_settings([
                'media_buttons' => false
            ]),

        Field::make('rich_text', 'caption', __('Caption'))
            ->set_help_text('Set a rich-text caption to this video. Meta ID: caption.')
            ->set_rows(8)
            ->set_settings([
                'media_buttons' => false
            ]),

        Field::make('select', 'size', __('Size'))
            ->set_help_text('Set a grid size to this video for large screens. Meta ID: size.')
            ->set_options(set_grid_size_options())
    ];
}

// Abstract fields (for key & value) to be reuse.
function add_crb_key_value_group($type = '') {
    $array =  [
        Field::make('text', 'key', 'Key')
            ->set_help_text('A key that is only used by the program. Do NOT Modify. Meta ID: key.')
            // ->set_required(true)
            ->set_width(20),

        Field::make('text', 'val', 'Value')
            ->set_help_text('Set the label value. Meta ID: val.')
            ->set_width(40),

        Field::make('textarea', 'note', 'Note')
            ->set_help_text('Set a help note for yourself that is not published. Meta ID: note.')
            ->set_width(40)
            ->set_rows(4),
    ];

    // Set if-condition inside the array.
    // https://stackoverflow.com/a/5693762/413225
    if ($type === 'textarea') {
        $array[1] = Field::make('textarea', 'val', 'Value')
            ->set_width(40)
            ->set_rows(4);
    }

    if ($type === 'rich_text') {
        $array[1] = Field::make('rich_text', 'val', 'Value')
            ->set_width(40)
            ->set_rows(8)
            ->set_settings([
                'media_buttons' => false
            ]);
    }

    return $array;
}
