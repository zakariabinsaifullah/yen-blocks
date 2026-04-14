import { __ } from '@wordpress/i18n';
import { useBlockProps, BlockControls, useInnerBlocksProps, RichText } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import {
    ToolbarGroup,
    ToggleControl,
    Button,
    Placeholder,
    RangeControl,
    ToolbarDropdownMenu,
    Spinner,
    SelectControl,
    __experimentalVStack as VStack, // eslint-disable-line
    __experimentalText as Text // eslint-disable-line
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { table as tableIcon } from '@wordpress/icons';
import classnames from 'classnames';
import Inspector from './inspector';

import BlockStyle from './style';

export default function Edit(props) {
    const { attributes, setAttributes, isSelected, clientId } = props;
    const {
        blockStyle,
        alignment,
        hasHeader,
        hasFooter,
        columnCount,
        rowCount,
        isGenerated,
        headerCells,
        footerCells,
        isFixedLayout
    } = attributes;

    // block props with styles
    const blockProps = useBlockProps({
        style: blockStyle
    });

    const { insertBlock, replaceInnerBlocks, removeBlock } = useDispatch('core/block-editor');
    const { innerBlocks } = useSelect(
        select => ({
            innerBlocks: select('core/block-editor').getBlocks(clientId)
        }),
        [clientId]
    );


    const innerBlocksProps = useInnerBlocksProps(
        {
            className: `gutentable-table ${isFixedLayout ? 'content-fixed' : ''}`
        },
        {
            allowedBlocks: ['yen-blocks/table-row'],
            template: [],
            renderAppender: false
        }
    );

    // Get current column count from first row
    const getCurrentColumnCount = () => {
        const firstRow = innerBlocks[0];
        return firstRow ? firstRow.innerBlocks.length : columnCount;
    };

    // Generate initial table structure
    const generateTable = () => {
        // Ensure we have at least 1 row and 1 column
        const finalRowCount = Math.max(1, rowCount || 1);
        const finalColumnCount = Math.max(1, columnCount || 1);

        const rows = [];

        for (let i = 0; i < finalRowCount; i++) {
            const cells = [];
            for (let j = 0; j < finalColumnCount; j++) {
                cells.push(createBlock('yen-blocks/table-cell', { tagName: 'td' }));
            }
            rows.push(createBlock('yen-blocks/table-row', {}, cells));
        }

        replaceInnerBlocks(clientId, rows, false);

        // Initialize header and footer cells array
        const initialCells = Array(finalColumnCount).fill('');
        setAttributes({
            isGenerated: true,
            columnCount: finalColumnCount,
            rowCount: finalRowCount,
            headerCells: hasHeader ? initialCells : [],
            footerCells: hasFooter ? initialCells : []
        });
    };

    // Update header/footer cells when column count changes
    const updateHeaderFooterCells = newColumnCount => {
        const currentCols = getCurrentColumnCount();

        if (newColumnCount >= currentCols) {
            // Add empty cells
            const newHeaderCells = [...(headerCells || [])];
            const newFooterCells = [...(footerCells || [])];

            for (let i = currentCols; i < newColumnCount; i++) {
                newHeaderCells.push('');
                newFooterCells.push('');
            }

            setAttributes({
                headerCells: newHeaderCells,
                footerCells: newFooterCells
            });
        } else if (newColumnCount < currentCols) {
            setAttributes({
                headerCells: (headerCells || []).slice(0, newColumnCount),
                footerCells: (footerCells || []).slice(0, newColumnCount)
            });
        }
    };

    // Add a new row
    const addRow = () => {
        const cells = [];
        const cols = getCurrentColumnCount();

        for (let i = 0; i < cols; i++) {
            cells.push(createBlock('yen-blocks/table-cell', { tagName: 'td' }));
        }

        const newRow = createBlock('yen-blocks/table-row', {}, cells);
        insertBlock(newRow, innerBlocks.length, clientId);
    };

    // Delete last row
    const deleteRow = () => {
        if (innerBlocks.length > 1) {
            const lastRow = innerBlocks[innerBlocks.length - 1];
            removeBlock(lastRow.clientId);
        }
    };

    // Add column to all rows
    const addColumn = () => {
        const newColCount = getCurrentColumnCount() + 1;

        innerBlocks.forEach(row => {
            const newCell = createBlock('yen-blocks/table-cell', {
                tagName: 'td'
            });
            insertBlock(newCell, row.innerBlocks.length, row.clientId);
        });

        updateHeaderFooterCells(newColCount);
        setAttributes({ columnCount: newColCount });
    };

    // Delete last column from all rows
    const deleteColumn = () => {
        const currentCols = getCurrentColumnCount();

        if (currentCols > 1) {
            innerBlocks.forEach(row => {
                if (row.innerBlocks.length > 1) {
                    const lastCell = row.innerBlocks[row.innerBlocks.length - 1];
                    removeBlock(lastCell.clientId);
                }
            });

            const newColCount = currentCols - 1;
            updateHeaderFooterCells(newColCount);
            setAttributes({ columnCount: newColCount });
        }
    };

    // Update a specific header cell
    const updateHeaderCell = (index, value) => {
        const newHeaderCells = [...(headerCells || [])];
        newHeaderCells[index] = value;
        setAttributes({ headerCells: newHeaderCells });
    };

    // Update a specific footer cell
    const updateFooterCell = (index, value) => {
        const newFooterCells = [...(footerCells || [])];
        newFooterCells[index] = value;
        setAttributes({ footerCells: newFooterCells });
    };

    // Ensure header/footer cells arrays are properly sized when toggled
    useEffect(() => {
        if (isGenerated) {
            const currentCols = getCurrentColumnCount();

            if (hasHeader && (!headerCells || headerCells.length !== currentCols)) {
                setAttributes({ headerCells: Array(currentCols).fill('') });
            } else if (!hasHeader && headerCells && headerCells.length > 0) {
                setAttributes({ headerCells: [] });
            }

            if (hasFooter && (!footerCells || footerCells.length !== currentCols)) {
                setAttributes({ footerCells: Array(currentCols).fill('') });
            } else if (!hasFooter && footerCells && footerCells.length > 0) {
                setAttributes({ footerCells: [] });
            }
        }
    }, [hasHeader, hasFooter, isGenerated, innerBlocks.length]);

    const currentCols = getCurrentColumnCount();
    const currentHeaderCells = headerCells || Array(currentCols).fill('');
    const currentFooterCells = footerCells || Array(currentCols).fill('');

    const hasInnerBlocks = innerBlocks.length > 0;
    if (!hasInnerBlocks) {
        return (
            <div {...blockProps}>
                <Placeholder
                    icon={tableIcon}
                    label={__('Yen Table Builder', 'yen-blocks')}
                    instructions={__('Configure your table structure', 'yen-blocks')}
                >
                    <div style={{ width: '100%', maxWidth: '400px' }}>
                        <RangeControl
                            label={__('Columns', 'yen-blocks')}
                            value={columnCount || 1}
                            onChange={value => setAttributes({ columnCount: Math.max(1, value) })}
                            min={1}
                            max={10}
                        />
                        <RangeControl
                            label={__('Rows', 'yen-blocks')}
                            value={rowCount || 1}
                            onChange={value => setAttributes({ rowCount: Math.max(1, value) })}
                            min={1}
                            max={20}
                        />
                        <ToggleControl
                            label={__('Include Header', 'yen-blocks')}
                            checked={hasHeader}
                            onChange={value => setAttributes({ hasHeader: value })}
                        />
                        <ToggleControl
                            label={__('Include Footer', 'yen-blocks')}
                            checked={hasFooter}
                            onChange={value => setAttributes({ hasFooter: value })}
                        />
                        <Button variant="primary" onClick={generateTable}>
                            {__('Generate Table', 'yen-blocks')}
                        </Button>
                    </div>
                </Placeholder>
            </div>
        );
    }

    return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarDropdownMenu
                        icon={tableIcon}
                        controls={[
                            {
                                title: __('Add New Row', 'yen-blocks'),
                                icon: 'table-row-after',
                                onClick: () => addRow()
                            },
                            {
                                title: __('Delete Last Row', 'yen-blocks'),
                                icon: 'table-row-delete',
                                onClick: () => deleteRow()
                            },
                            {
                                title: __('Add New Column', 'yen-blocks'),
                                icon: 'table-col-after',
                                onClick: () => addColumn()
                            },
                            {
                                title: __('Delete Last Column', 'yen-blocks'),
                                icon: 'table-col-delete',
                                onClick: () => deleteColumn()
                            }
                        ]}
                    />
                </ToolbarGroup>
            </BlockControls>

            {isSelected && (
                <>
                    <Inspector {...props} />
                    <BlockStyle {...props} />
                </>
            )}
            <div {...blockProps}>
                <table
                    className={classnames('yen-blocks', {
                        ['fixed-layout']: isFixedLayout,
                        [alignment]: alignment !== ''
                    })}
                >
                    {hasHeader && (
                        <thead className="header-row">
                            <tr>
                                {currentHeaderCells.map((cell, index) => (
                                    <RichText
                                        key={index}
                                        tagName="th"
                                        className="header-cell"
                                        value={cell}
                                        onChange={value => updateHeaderCell(index, value)}
                                        placeholder={__(`Header ${index + 1}`, 'yen-blocks')}
                                    />
                                ))}
                            </tr>
                        </thead>
                    )}
                    <tbody {...innerBlocksProps} />
                    {hasFooter && (
                        <tfoot className="footer-row">
                            <tr>
                                {currentFooterCells.map((cell, index) => (
                                    <RichText
                                        key={index}
                                        tagName="td"
                                        className="footer-cell"
                                        value={cell}
                                        onChange={value => updateFooterCell(index, value)}
                                        placeholder={__(`Footer ${index + 1}`, 'yen-blocks')}
                                    />
                                ))}
                            </tr>
                        </tfoot>
                    )}
                </table>
            </div>
        </>
    );
}
