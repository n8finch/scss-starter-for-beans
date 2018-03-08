<?php

//* Add landing page body class to the head
add_filter( 'body_class', 'mbio_add_body_class' );
function mbio_add_body_class( $classes ) {
	$classes[] = 'custompage custompage-template';
	return $classes;
}

beans_remove_markup( 'beans_fixed_wrap_main' );
// beans_remove_attribute( 'beans_main', 'class', 'uk-block' );
// beans_remove_attribute( 'beans_post', 'class', 'uk-panel-box' );

// add_action( 'beans_uikit_enqueue_scripts', 'mbio_custompage_ui_kit_components_enqueue' );
function mbio_custompage_ui_kit_components_enqueue() {

	// beans_uikit_enqueue_components( array( 'overlay' ) );

}

/**
 * Modify main content area of front page
 * 1. Remove the beans_loop_template
 * 2. Add a class to the beans_content
 * 3. Add custom view content to the beans_content area
 */

beans_remove_action( 'beans_loop_template' );
// beans_add_attribute( 'beans_main', 'id', 'front-page-main-section' );
// beans_add_attribute( 'beans_content', 'class', 'uk-grid uk-grid-collapse' );
beans_add_smart_action( 'beans_content', 'mbio_view_custompage_content' );

function mbio_view_custompage_content() {

	?>
	Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
	<?php

}

beans_load_document();
