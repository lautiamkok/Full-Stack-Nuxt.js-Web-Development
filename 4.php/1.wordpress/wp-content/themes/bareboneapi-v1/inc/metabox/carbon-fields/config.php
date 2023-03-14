<?php
// Set generic options.

// Set all available post types.
function set_all_available_post_types() {
    return [
        [
            'type'      => 'post',
            'post_type' => 'post',
        ],
        [
            'type'      => 'post',
            'post_type' => 'page',
        ],
        [
            'type'      => 'post',
            'post_type' => 'project',
        ]
    ];
}

// Abstract responsive image size options to be reuse.
function set_grid_size_options() {
    return [
        '' => 'Select One',
        '3/12' => '3/12',
        '4/12' => '4/12',
        '5/12' => '5/12',
        '6/12' => '6/12',
        '7/12' => '7/12',
        '9/12' => '9/12',
        '10/12' => '10/12',
        '11/12' => '11/12',
        '12/12' => '12/12',
    ];
}

function set_percentage_options() {
    return [
        '' => 'Select One',
        '0' => 0,
        '10' => 10,
        '20' => 20,
        '30' => 30,
        '40' => 40,
        '50' => 50,
        '60' => 60,
        '70' => 70,
        '80' => 80,
        '90' => 90,
        '100' => 100,
    ];
}

