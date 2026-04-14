<?php
/**
 * Plugin Name:       Yen Blocks
 * Description:       A native flexible table builder block for the Gutenberg Block Editor.
 * Version:           1.0.3
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Yen Builder
 * Author URI:        https://wpnativeblocks.com/table-builder/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       yen-blocks
 *
 * @package YenBlocks\Blocks
 */

namespace YenBlocks\Blocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Main plugin class
 */
class Yen_Blocks {

	/**
	 * Plugin version
	 */
	public const VERSION = '1.0.3';

	/**
	 * The single instance of the class.
	 */
	private static $instance = null;

	/**
	 * Get the singleton instance
	 */
	public static function getInstance() {
		if ( self::$instance === null ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Initialize the plugin
	 */
	private function __construct() {
		add_action( 'init', [ $this, 'init_block' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'register_swiper_assets' ] );

		// check block theme
		if( ! wp_is_block_theme() ) {
			add_filter( 'should_load_separate_core_block_assets', '__return_true' );
		}

		// custom block category
		add_filter( 'block_categories_all', [ $this, 'add_custom_block_category' ], 10, 2 );
	}

	/**
	 * Initialize the block registration
	 */
	public function init_block() {
		/**
		 * Registers multiple block types from metadata collection.
		 * Added in WordPress 6.9 to further simplify the block registration process.
		 */
		if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
			wp_register_block_types_from_metadata_collection( __DIR__ . '/build/blocks', __DIR__ . '/build/blocks-manifest.php' );
			return;
		}

		/**
		 * Registers the block(s) metadata from the `blocks-manifest.php`.
		 * Added in WordPress 6.7 to simplify the block metadata registration process.
		 */
		if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
			wp_register_block_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
		}

		/**
		 * Registers each block type individually based on the `blocks-manifest.php` file.
		 */
		$manifest_data = require __DIR__ . '/build/blocks-manifest.php';
		foreach ( array_keys( $manifest_data ) as $block_type ) {
			register_block_type( __DIR__ . "/build/blocks/{$block_type}" );
		}
	}

	/**
	 * Register Swiper CSS and JS as named handles so the carousel block
	 * can declare them as dependencies in its block.json.
	 */
	public function register_swiper_assets() {
		wp_register_style(
			'yen-swiper-style',
			'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
			[],
			'11'
		);

		wp_register_script(
			'yen-swiper-script',
			'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
			[],
			'11',
			true
		);
	}

	/**
	 * Add custom block category
	 *
	 * @param array  $categories Existing block categories.
	 * @param object $post       Post being edited.
	 * @return array Modified block categories.
	 */
	public function add_custom_block_category( $categories, $post ) {
		$custom_category = [
			'slug'  => 'yen-blocks',
			'title' => __( 'Yen Blocks', 'yen-blocks' ),
		];
		array_unshift( $categories, $custom_category ); // Add to the beginning of the categories array
		return $categories;
	}
}

// Initialize the plugin
Yen_Blocks::getInstance();
