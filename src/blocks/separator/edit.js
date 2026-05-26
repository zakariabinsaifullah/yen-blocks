/**
 * WordPress Dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Fragment, useEffect } from '@wordpress/element';

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
        titleColor,
        lineColor,
        separatorHeight,
        alignment,
        titleSize,
        iconColor
    } = attributes;

    const cssCustomProperties = {
        ...(lineColor && { '--yen-line-color': lineColor }),
        ...(titleColor && { '--yen-title-color': titleColor }),
        ...(separatorHeight && { '--yen-separator-height': separatorHeight }),
        ...(titleSize && { '--yen-title-size': titleSize }),
        '--yen-icon-color': iconColor || '#d4a4b8'
    };

    /**
     * Handle Block Style Effect
     */
    useEffect(() => {
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [lineColor, titleColor, separatorHeight, iconColor]);

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
                    <span className="separator-icon" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor">
                            <ellipse cx="50" cy="22" rx="12" ry="20" transform="rotate(0 50 50)" />
                            <ellipse cx="50" cy="22" rx="12" ry="20" transform="rotate(60 50 50)" />
                            <ellipse cx="50" cy="22" rx="12" ry="20" transform="rotate(120 50 50)" />
                            <ellipse cx="50" cy="22" rx="12" ry="20" transform="rotate(180 50 50)" />
                            <ellipse cx="50" cy="22" rx="12" ry="20" transform="rotate(240 50 50)" />
                            <ellipse cx="50" cy="22" rx="12" ry="20" transform="rotate(300 50 50)" />
                            <circle cx="50" cy="50" r="10" />
                        </svg>
                    </span>
                </div>
            </div>
        </Fragment>
    );
};

export default Edit;