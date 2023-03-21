<?php
use Carbon_Fields\Container;
use Carbon_Fields\Field;

// Theme options metabox.
add_action('carbon_fields_register_fields', 'crb_attach_theme_options');
function crb_attach_theme_options() {

    // Default options page
    $basic_options_container = Container::make('theme_options', __('Basic Options')) 

        // https://docs.carbonfields.net/learn/containers/tabs.html
        ->add_tab(__('General Settings'), [
            Field::make('text', 'h1', 'H1')
                ->set_help_text('Set an (invisible) H1 on the front page.')
                ->set_width(100),
                
            Field::make('textarea', 'description', __('Description'))
                // ->set_required(true)
                ->set_width(50)
                ->set_rows(8),

            Field::make('textarea', 'keywords', __('Keywords'))
                ->set_width(50)
                ->set_rows(8),

            Field::make('text', 'company', 'Company')
                ->set_help_text('Set a company name.')
                ->set_width(50),

            Field::make('text', 'tagline', 'Tagline')
                ->set_help_text('Set a company tagline.')
                ->set_width(50),

            Field::make('text', 'telephone', 'Telephone')
                ->set_width(50),

            Field::make('text', 'email', 'Email')
                ->set_width(50),

            Field::make('textarea', 'address', __('Address'))
                ->set_width(50)
                ->set_rows(8),

            Field::make('textarea', 'opening_hours', __('Opening Hours'))
                ->set_width(50)
                ->set_rows(8),

            Field::make('textarea', 'copyright', __('Copyright'))
                ->set_width(50)
                ->set_rows(8),

            Field::make('textarea', 'credit', __('Credit'))
                ->set_width(50)
                ->set_rows(8),

            Field::make('image', 'logo', __('Logo'))
                ->set_help_text('Set a logo to this site.')
                ->set_width(50),

            Field::make('image', 'favicon', __('Favicon'))
                ->set_help_text('Set a favicon to this site.')
                ->set_width(50),

            Field::make('complex', 'logos', 'Logos')
                ->set_help_text('Set multiple logos on this site. For example, the logos on the footer.')
                ->add_fields('icon',  [
                    Field::make('text', 'name', __('Name'))
                        ->set_help_text('Set the name of the icon, e.g. "icon-ce".')
                        ->set_width(50),

                    Field::make('text', 'sizes', __('Sizes'))
                        ->set_help_text('Set the icon responsive sizes, e.g. "text-5xl @md:text-2xl @sm:text-xl".')
                        ->set_width(50),
                ])

                ->add_fields('image',  [
                    Field::make('image', 'id', __('Image'))
                        ->set_help_text('Set an image.')
                        ->set_width(50),
                ]),            
        ])

        ->add_tab(__('Cookie Bar'), [
            Field::make('complex', 'cookies', '')
                ->set_layout('tabbed-horizontal')
                ->set_max(1)
                ->set_help_text('Set a cookie bar on the website. Meta ID: cookies.')
                ->add_fields([
                    Field::make('rich_text', 'message', __('Message'))
                        ->set_help_text('Set the cookie message. Meta ID: message.')
                        ->set_rows(8)
                        ->set_settings([
                            'media_buttons' => false
                        ]),

                    Field::make('text', 'accept', 'Accept')
                        ->set_help_text('Set the text for the Accept button. Meta ID: accept.')
                        ->set_width(100),

                    Field::make('text', 'reject', 'Reject')
                        ->set_help_text('Set the text for the Reject button. Meta ID: reject.')
                        ->set_width(100),

                    Field::make('checkbox', 'disable', 'Disable')
                        ->set_help_text('Check the box to turn off the cookie bar if it is not needed on your site. Meta ID: disable.'),
                ])
                ->set_default_value([
                    [
                        'message' => 'We use cookies to provide our services and for analytics and marketing. To find out more about our use of cookies, please see our Privacy Policy. By continuing to browse our website, you agree to our use of cookies.',
                        'accept' => 'Accept',
                        'reject' => 'Reject'
                    ],
                ]),
            
        ])

        ->add_tab(__('Page Not Found (404)'), [
            Field::make('complex', 'page_not_found', '')
                ->set_help_text('Set contents for page not found (404).')

                ->add_fields('title',  [
                    Field::make('text', 'title', __(''))
                        ->set_help_text('Set a title to this page.')
                        ->set_width(100),
                ])

                ->add_fields('description',  [
                    Field::make('rich_text', 'description', __(''))
                        ->set_help_text('Set a description to this page.')
                        ->set_width(100)
                        ->set_rows(8)
                        ->set_settings([
                            'media_buttons' => false
                        ]),
                ])

                ->add_fields('content',  [
                    Field::make('rich_text', 'content', __(''))
                        ->set_help_text('Set a texual content to this page.')
                        ->set_width(100)
                        ->set_rows(8)
                        ->set_settings([
                            'media_buttons' => false
                        ]),
                ])

                ->add_fields('images',  [
                    Field::make('complex', 'images', '')
                        ->set_help_text('Set an image content or a multiple-image content to this page.')
                        ->set_layout('tabbed-vertical')
                        ->add_fields(add_crb_asset_fields()),
                ]),
        ])
        ;

    // Add new options page under 'Basic Options'
    Container::make('theme_options', __('Social Options'))
        ->set_page_parent($basic_options_container) // reference to a top level container

        ->add_tab(__('Open Graph'), [
            Field::make('complex', 'open_graph', '')
                ->set_duplicate_groups_allowed(false)
                // ->set_max(1) // same as above.
                ->add_fields([
                    Field::make('text', 'fb_app_id', 'fb:app_id')
                        ->set_help_text('Go to https://developers.facebook.com/, create a Facebook app and grab the ID from there, e.g. 2740922996222837.')
                        ->set_width(100),

                    Field::make('text', 'og_type', 'og:type')
                        ->set_default_value('article')
                        ->set_help_text('The type of your object, e.g. video.movie.')
                        ->set_width(100),

                    Field::make('image', 'og_image', 'og:image')
                        ->set_help_text('The cover image of the post you share on social channels.')
                        ->set_value_type('url'),

                    Field::make('number', 'og_image_width', 'og:image:width')
                        ->set_default_value(1200)
                        ->set_help_text('The width of the cover image.')
                        ->set_width(100),

                    Field::make('number', 'og_image_height', 'og:image:height')
                        ->set_default_value(720)
                        ->set_help_text('The height of the cover image.')
                        ->set_width(100),

                    Field::make('text', 'twitter_card', 'twitter:card')
                        ->set_default_value('summary_large_image')
                        ->set_help_text('The type of Twitter Card, .e.g. summary, summary_large_image, etc. For more information, please check https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards')
                        ->set_width(100),

                    Field::make('text', 'twitter_site', 'twitter:site')
                        ->set_default_value('')
                        ->set_help_text('@username for the website used in the card footer.')
                        ->set_width(100),

                    Field::make('text', 'twitter_creator', 'twitter:creator')
                        ->set_default_value('')
                        ->set_help_text('@username for the content creator / author.')
                        ->set_width(100),
                ])
                ->set_default_value([
                    [
                        'fb_app_id' => '',
                        'og_type' => 'article',
                        'og_image' => '',
                        'og_image_width' => '1200',
                        'og_image_height' => '1200',
                        'twitter_card' => 'summary_large_image',
                        'twitter_site' => '',
                        'twitter_creator' => '',
                    ],
                ]),
        ])

        ->add_tab(__('Social Profiles'), [
            // Repeater.
            // https://carbonfields.net/docs/guides-repeating-groups-2/?crb_version=2-2-0
            Field::make('complex', 'social_profiles', '')
                // ->set_min(1)
                // ->set_max(5)
                // ->set_layout('tabbed-horizontal')
                // ->set_layout('tabbed-vertical')
                ->set_help_text('Add social profiles. Meta ID: social_profiles.')
                ->add_fields([
                    Field::make('text', 'slug', 'Slug')
                        ->set_help_text('e.g. facebook, instagram, etc')
                        ->set_width(20),

                    Field::make('text', 'name_short', 'Short Name')
                        ->set_help_text('e.g. nasa, bbc')
                        ->set_width(20),

                    Field::make('text', 'name_long', 'Long Name')
                        ->set_help_text('e.g. instagram.com/nasa')
                        ->set_width(20),

                    Field::make('text', 'url', 'URL')
                        ->set_help_text('e.g. https://www.instagram.com/nasa/')
                        ->set_width(20),

                    Field::make('text', 'icon', 'Icon')
                        ->set_help_text('e.g. icon-social-facebook, icon-social-instagram')
                        ->set_width(20),
                ]),
        ])

        ;

}
