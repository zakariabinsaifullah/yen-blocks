import { RichText, useBlockProps } from '@wordpress/block-editor';
import classNames from 'classnames';

const save = props => {
    const { attributes } = props;
    const {
        title,
        titleTag,
        blockStyle,
        alignment
    } = attributes;

    const blockProps = useBlockProps.save({
        className: classNames('yen-blocks-heading', 'has-separator', `is-aligned-${alignment}`),
        style: blockStyle
    });

    return (
        <div {...blockProps}>
            <div className="title-inner">
                <RichText.Content
                    tagName={titleTag}
                    value={title}
                    className="title-text"
                />
            </div>
        </div>
    );
};

export default save;
