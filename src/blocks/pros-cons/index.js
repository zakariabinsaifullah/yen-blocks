import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType(metadata.name, {
    ...metadata,
    icon: {
        src: 'smiley',
        foreground: '#eb1165',
    },
    edit,
    save
});