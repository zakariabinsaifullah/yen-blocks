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
import { normalizeSvg } from '../../utils/svg';

// block edit function
const Edit = props => {
    const { attributes, setAttributes, isSelected } = props;
    const { text, icon } = attributes;

    const blockProps = useBlockProps({
        className: classNames('yen-blocks-list-item')
    });

    return (
        <Fragment>
            {isSelected && <Inspector {...props} />}
            <div {...blockProps}>
                {icon && (
                    <span
                        className="list-item-icon"
                        dangerouslySetInnerHTML={{ __html: normalizeSvg( icon ) }}
                    />
                )}
                {!icon && (
                    <span className="list-item-icon list-item-icon--empty" aria-hidden="true" />
                )}
                <RichText
                    className="list-item-text"
                    tagName="span"
                    value={text}
                    allowedFormats={['core/bold', 'core/italic', 'core/link']}
                    onChange={value => setAttributes({ text: value })}
                    placeholder={__('List item text', 'yen-blocks')}
                />
            </div>
        </Fragment>
    );
};

export default Edit;
