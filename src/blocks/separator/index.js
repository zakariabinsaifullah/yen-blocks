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
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#1f1f1f"><path d="M140-440q-25 0-42.5-17.5T80-500t17.5-42.5T140-560h240q25 0 42.5 17.5T440-500t-17.5 42.5T380-440zm440 0q-25 0-42.5-17.5T520-500t17.5-42.5T580-560h240q25 0 42.5 17.5T880-500t-17.5 42.5T820-440z"/></svg>
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
