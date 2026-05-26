import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType(metadata.name, {
    icon: {
        src: (
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#1f1f1f"><path d="M700-120h40v-100h100v-40H740v-100h-40v100H600v40h100zm20 80q-83 0-141.5-58.5T520-240t58.5-141.5T720-440t141.5 58.5T920-240 861.5-98.5 720-40M360-680v-80h480v80zM200-160q-33 0-56.5-23.5T120-240t23.5-56.5T200-320t56.5 23.5T280-240t-23.5 56.5T200-160m0-240q-33 0-56.5-23.5T120-480t23.5-56.5T200-560t56.5 23.5T280-480t-23.5 56.5T200-400m-56.5-263.5Q120-687 120-720t23.5-56.5T200-800t56.5 23.5T280-720t-23.5 56.5T200-640t-56.5-23.5M360-200v-80h83q-3 20-3 40t3 40zm0-240v-80h360q-57 0-107 21.5T525-440z"/></svg>
        ),
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
