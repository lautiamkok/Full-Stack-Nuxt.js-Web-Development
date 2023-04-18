<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Barebone API
 * @since 1.0
 * @version 1.0
 */
get_header(); ?>

<main>
  <h1><?php the_title(); ?></h1>
  <p>Hello World</p>
</main>

<?php get_footer();
