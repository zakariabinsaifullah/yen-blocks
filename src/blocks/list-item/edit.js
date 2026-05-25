/**
 * WordPress Dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * External Dependencies
 */
import classNames from 'classnames';

// inspector controls
import Inspector from './inspector';

// block edit function
const Edit = props => {
    const { attributes, setAttributes, isSelected } = props;
    const { text, icon, textColor, iconColor, iconGap } = attributes;

    const cssVars = {
        ...(textColor && { '--yen-item-text-color': textColor }),
        ...(iconColor && { '--yen-item-icon-color': iconColor }),
        '--yen-icon-gap': iconGap || '14px'
    };

    const blockProps = useBlockProps({
        className: classNames('yen-blocks-list-item'),
        style: cssVars
    });

    return (
        <Fragment>
            {isSelected && <Inspector {...props} />}
            <div {...blockProps}>
                {icon && (
                    <span
                        className="list-item-icon"
                        dangerouslySetInnerHTML={{ __html: icon }}
                    />
                )}
                {!icon && (
                    <span className="list-item-icon list-item-icon--empty" aria-hidden="true" />
                )}
                <RichText
                    className="list-item-text"
                    tagName="span"
                    value={text}
                    allowedFormats={['core/bold', 'core/italic']}
                    onChange={value => setAttributes({ text: value })}
                    placeholder={__('List item text', 'yen-blocks')}
                />
            </div>
        </Fragment>
    );
};

export default Edit;
