import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';
import { blockTable } from '@wordpress/icons';
/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType(metadata.name, {
    icon: {
        src: blockTable,
        foreground: '#eb1165',
    },
    /**
     * @see ./edit.js
     */
    edit: Edit,

    /**
     * @see ./save.js
     */
    save
});
