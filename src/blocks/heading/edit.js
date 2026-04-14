/**
 * WordPress Dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { Fragment, useEffect } from '@wordpress/element';
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
    const {
        title,
        titleTag,
        titleColor,
        lineColor,
        separatorHeight,
        alignment,
        titleSize
    } = attributes;

    const cssCustomProperties = {
        ...(lineColor && { '--yen-line-color': lineColor }),
        ...(titleColor && { '--yen-title-color': titleColor }),
        ...(separatorHeight && { '--yen-separator-height': separatorHeight }),
        ...(titleSize && { '--yen-title-size': titleSize })
    };

    /**
     * Handle Block Style Effect
     */
    useEffect(() => {
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [lineColor, titleColor, separatorHeight]);

    /**
     * Block Props
     */
    const blockProps = useBlockProps({
        className: classNames('yen-blocks-heading', 'has-separator', `is-aligned-${alignment}`),
        style: cssCustomProperties
    });

    return (
        <Fragment>
            {isSelected && <Inspector {...props} />}
            <div {...blockProps}>
                <div className="title-inner">
                    <RichText
                        className="title-text"
                        tagName={titleTag}
                        value={title}
                        allowedFormats={['core/bold', 'core/italic']}
                        onChange={value => setAttributes({ title: value })}
                        placeholder={__('Add your title', 'yen-blocks')}
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default Edit;