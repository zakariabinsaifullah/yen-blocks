import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';
import classnames from 'classnames';

export default function save({ attributes }) {
    const {
        hasHeader,
        hasFooter,
        headerCells,
        footerCells,
        isFixedLayout,
        blockStyle,
        alignment
    } = attributes;

    const blockProps = useBlockProps.save({
        style: blockStyle
    });

    return (
        <div {...blockProps}>
            <table
                className={classnames('yen-blocks', {
                    ['fixed-layout']: isFixedLayout,
                    [alignment]: alignment !== ''
                })}
            >
                {hasHeader && headerCells && headerCells.length > 0 && (
                    <thead className="header-row">
                        <tr>
                            {headerCells.map((cell, index) => (
                                <RichText.Content key={index} tagName="th" className="header-cell" value={cell} />
                            ))}
                        </tr>
                    </thead>
                )}
                <tbody>
                    <InnerBlocks.Content />
                </tbody>
                {hasFooter && footerCells && footerCells.length > 0 && (
                    <tfoot className="footer-row">
                        <tr>
                            {footerCells.map((cell, index) => (
                                <RichText.Content key={index} tagName="td" className="footer-cell" value={cell} />
                            ))}
                        </tr>
                    </tfoot>
                )}
            </table>
        </div>
    );
}
