import { RichText, useBlockProps } from '@wordpress/block-editor';
import classNames from 'classnames';

const save = props => {
    const { attributes } = props;
    const { text, icon, textColor, iconColor, iconGap } = attributes;

    const cssVars = {
        ...(textColor && { '--yen-item-text-color': textColor }),
        ...(iconColor && { '--yen-item-icon-color': iconColor }),
        '--yen-icon-gap': iconGap || '14px'
    };

    const blockProps = useBlockProps.save({
        className: classNames('yen-blocks-list-item'),
        style: cssVars
    });

    return (
        <div {...blockProps}>
            {icon && (
                <span
                    className="list-item-icon"
                    dangerouslySetInnerHTML={{ __html: icon }}
                />
            )}
            <RichText.Content
                tagName="span"
                value={text}
                className="list-item-text"
            />
        </div>
    );
};

export default save;
