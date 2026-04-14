import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const blockProps = useBlockProps.save({
        style: attributes.blockStyle
    });

    return (
        <td {...blockProps}>
            <InnerBlocks.Content />
        </td>
    );
}
