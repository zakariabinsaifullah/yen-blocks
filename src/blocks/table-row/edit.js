import { useBlockProps, useInnerBlocksProps, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import {
    __experimentalToolsPanel as ToolsPanel, // eslint-disable-lines
    __experimentalToolsPanelItem as ToolsPanelItem // eslint-disable-line
} from '@wordpress/components';
import { NativeBorderBoxControl } from '../../components';

import { __ } from '@wordpress/i18n';
import { generateBorderWidth, generateBorderStyle, generateBorderColor } from '../../styles';

export default function Edit({ attributes, setAttributes }) {
    const { rowColor, rowBg, tableRowBorder } = attributes;

    // table border
    const borderWidth = tableRowBorder ? generateBorderWidth(tableRowBorder) : null;
    const borderStyle = tableRowBorder ? generateBorderStyle(tableRowBorder) : null;
    const borderColor = tableRowBorder ? generateBorderColor(tableRowBorder) : null;

    const cssCustomProperties = {
        ...(rowColor && { '--trcolor': rowColor }),
        ...(rowBg && { '--trbg': rowBg }),
        ...(borderWidth && { '--trow-width': borderWidth }),
        ...(borderStyle && { '--trow-style': borderStyle }),
        ...(borderColor && { '--trow-color': borderColor })
    };

    const blockProps = useBlockProps({ style: cssCustomProperties });
    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        allowedBlocks: ['yen-blocks/table-cell'],
        template: [],
        renderAppender: false
    });

    useEffect(() => {
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [rowColor, rowBg, tableRowBorder]);

    return (
        <>
            <InspectorControls>
                <PanelColorSettings
                    title={__('Colors', 'yen-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: rowColor,
                            onChange: rowColor => setAttributes({ rowColor }),
                            label: __('Color', 'yen-blocks')
                        },
                        {
                            value: rowBg,
                            onChange: rowBg => setAttributes({ rowBg }),
                            label: __('Background', 'yen-blocks')
                        }
                    ]}
                />
                <ToolsPanel
                    label={__('Border', 'yen-blocks')}
                    resetAll={() =>
                        setAttributes({
                            tableRowBorder: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!tableRowBorder?.width || !!tableRowBorder?.color || !!tableRowBorder?.style}
                        label={__('Border', 'yen-blocks')}
                        onDeselect={() => {
                            setAttributes({
                                tableRowBorder: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeBorderBoxControl
                            label={__('Border', 'yen-blocks')}
                            value={tableRowBorder}
                            onChange={border => setAttributes({ tableRowBorder: border })}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
            </InspectorControls>
            <tr {...innerBlocksProps} />
        </>
    );
}
