import { RichText, useBlockProps } from '@wordpress/block-editor';
import classNames from 'classnames';
import { normalizeSvg } from '../../utils/svg';

const save = props => {
    const { attributes } = props;
    const { text, icon } = attributes;

    const blockProps = useBlockProps.save({
        className: classNames('yen-blocks-list-item')
    });

    return (
        <div {...blockProps}>
            {icon && (
                <span
                    className="list-item-icon"
                    dangerouslySetInnerHTML={{ __html: normalizeSvg( icon ) }}
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
