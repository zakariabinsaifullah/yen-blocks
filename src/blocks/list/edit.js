/**
 * WordPress Dependencies
 */
import { BlockControls, RichText, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { dispatch, select } from '@wordpress/data';
import { Fragment, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * External Dependencies
 */
import classNames from 'classnames';

// inspector controls
import Inspector from './inspector';
import { normalizeSvg } from '../../utils/svg';

const ChevronIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

// block edit function
const Edit = props => {
    const { attributes, setAttributes, clientId, isSelected } = props;
    const { uniqueId, heading, headingTag, headingColor, itemGap, mobileIcon, listFontSize, headingFontSize, iconSize, mobileIconSize, textColor, iconColor, iconGap, mobileIconColor } = attributes;

    const [isOpen, setIsOpen] = useState(false);

    const cssVars = {
        ...(headingColor && { '--yen-heading-color': headingColor }),
        '--yen-item-gap': itemGap || '4px',
        ...(listFontSize && { '--yen-list-font-size': listFontSize }),
        ...(headingFontSize && { '--yen-heading-font-size': headingFontSize }),
        ...(iconSize && { '--yen-icon-size': iconSize }),
        ...(mobileIconSize && { '--yen-mobile-icon-size': mobileIconSize }),
        ...(textColor && { '--yen-item-text-color': textColor }),
        ...(iconColor && { '--yen-item-icon-color': iconColor }),
        '--yen-icon-gap': iconGap || '14px',
        ...(mobileIconColor && { '--yen-mobile-icon-color': mobileIconColor })
    };

    const blockProps = useBlockProps({
        className: classNames('yen-blocks-list', uniqueId, { 'is-open': isOpen }),
        style: cssVars
    });

    const innerBlockProps = useInnerBlocksProps(
        { className: 'list-inner' },
        {
            allowedBlocks: ['yen-blocks/list-item'],
            template: [['yen-blocks/list-item'], ['yen-blocks/list-item']],
            renderAppender: false,
            templateLock: false
        }
    );

    const childBlocks = select('core/block-editor').getBlocks(clientId);
    const appendBtn = () => {
        const newBlock = createBlock('yen-blocks/list-item', {});
        dispatch('core/block-editor').insertBlock(newBlock, childBlocks.length, clientId);
    };

    return (
        <Fragment>
            {isSelected && <Inspector {...props} />}
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton icon="insert" title={__('Add List Item', 'yen-blocks')} onClick={appendBtn} />
                </ToolbarGroup>
            </BlockControls>
            <div {...blockProps}>
                <div className="list-header">
                    {mobileIcon && (
                        <span
                            className="list-header-icon"
                            dangerouslySetInnerHTML={{ __html: normalizeSvg( mobileIcon ) }}
                        />
                    )}
                    <RichText
                        className="list-heading"
                        tagName={headingTag}
                        value={heading}
                        allowedFormats={['core/bold', 'core/italic']}
                        onChange={value => setAttributes({ heading: value })}
                        placeholder={__('List Heading', 'yen-blocks')}
                    />
                    <span
                        className="list-chevron"
                        aria-hidden="true"
                        onClick={e => { e.stopPropagation(); setIsOpen(prev => !prev); }}
                    >
                        <ChevronIcon />
                    </span>
                </div>
                <div {...innerBlockProps} />
            </div>
        </Fragment>
    );
};

export default Edit;
