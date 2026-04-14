/**
 * WordPress Dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { Fragment, RawHTML, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * External Dependencies
 */
import classNames from 'classnames';

// styles
import './style.scss';

// inspector controls
import Inspector from './inspector';

const Edit = props => {
    const { attributes, setAttributes, isSelected } = props;
    const { label, icon, iconPos, btnColors } = attributes;

    const cssCustomProperties = {
        ...(btnColors?.color && { '--btn-color': btnColors.color }),
        ...(btnColors?.bg && { '--btn-bg': btnColors.bg }),
        ...(btnColors?.hoverColor && { '--btn-hover-color': btnColors.hoverColor }),
        ...(btnColors?.hoverBg && { '--btn-hover-bg': btnColors.hoverBg })
    };

    console.log('cssCustomProperties', cssCustomProperties, btnColors);

    /**
     * Handle Block Style Effect
     */
    useEffect(() => {
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [btnColors, iconPos]);

    /**
     * Block Props
     */
    const blockProps = useBlockProps({
        style: cssCustomProperties
    });

    return (
        <Fragment>
            {isSelected && <Inspector {...props} />}
            <div {...blockProps}>
                <a
                    className={classNames('btn-inner', {
                        [`icon-${iconPos}`]: iconPos && icon
                    })}
                    href="#"
                    onClick={e => e.preventDefault()}
                >
                    <RichText
                        className="btn-label"
                        tagName="span"
                        value={label}
                        allowedFormats={['core/bold', 'core/italic']}
                        onChange={value => setAttributes({ label: value })}
                        placeholder={__('Button', 'yen-blocks')}
                    />
                    {icon && (
                        <span className="btn-icon">
                            <RawHTML>{icon}</RawHTML>
                        </span>
                    )}
                </a>
            </div>
        </Fragment>
    );
};

export default Edit;
