import { useBlockProps } from '@wordpress/block-editor';
import classNames from 'classnames';

const save = props => {
    const { attributes } = props;
    const {
        blockStyle,
        alignment
    } = attributes;

    const blockProps = useBlockProps.save({
        className: classNames('yen-blocks-heading', 'has-separator', `is-aligned-${alignment}`),
        style: blockStyle
    });

    return (
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
    );
};

export default save;
