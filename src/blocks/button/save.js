/**
 * WordPress Dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { RawHTML } from '@wordpress/element';

/**
 * External Dependencies
 */
import classNames from 'classnames';

const Save = props => {
    const { attributes } = props;
    const { label, url, linkTarget, rel, icon, iconPos, blockStyle } = attributes;

    const blockProps = useBlockProps.save({
        style: blockStyle
    });

    return (
        <div {...blockProps}>
            <a
                className={classNames('btn-inner', {
                    [`icon-${iconPos}`]: iconPos && icon
                })}
                href={url}
                target={linkTarget}
                rel={rel}
            >
                <RichText.Content className="btn-label" tagName="span" value={label} />
                {icon && (
                    <span className="btn-icon">
                        <RawHTML>{icon}</RawHTML>
                    </span>
                )}
            </a>
        </div>
    );
};

export default Save;
