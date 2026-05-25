import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import classNames from 'classnames';

const ChevronIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

const save = props => {
    const { attributes } = props;
    const { uniqueId, heading, headingTag, headingColor, itemGap, mobileIcon, listFontSize, headingFontSize, iconSize, mobileIconSize } = attributes;

    const cssVars = {
        ...(headingColor && { '--yen-heading-color': headingColor }),
        '--yen-item-gap': itemGap || '4px',
        ...(listFontSize && { '--yen-list-font-size': listFontSize }),
        ...(headingFontSize && { '--yen-heading-font-size': headingFontSize }),
        ...(iconSize && { '--yen-icon-size': iconSize }),
        ...(mobileIconSize && { '--yen-mobile-icon-size': mobileIconSize })
    };

    const blockProps = useBlockProps.save({
        className: classNames('yen-blocks-list', uniqueId),
        style: cssVars
    });

    return (
        <div {...blockProps}>
            <div className="list-header">
                {mobileIcon && (
                    <span
                        className="list-header-icon"
                        dangerouslySetInnerHTML={{ __html: mobileIcon }}
                    />
                )}
                <RichText.Content
                    tagName={headingTag}
                    value={heading}
                    className="list-heading"
                />
                <span className="list-chevron" aria-hidden="true">
                    <ChevronIcon />
                </span>
            </div>
            <div className="list-inner">
                <InnerBlocks.Content />
            </div>
        </div>
    );
};

export default save;
