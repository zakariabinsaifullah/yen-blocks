import { useBlockProps, useInnerBlocksProps, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
    __experimentalToolsPanel as ToolsPanel, // eslint-disable-lines
    __experimentalToolsPanelItem as ToolsPanelItem // eslint-disable-line
} from '@wordpress/components';
import { NativeBorderBoxControl } from '../../components';
import { generateBorderWidth, generateBorderStyle, generateBorderColor } from '../../styles';

export default function Edit({ attributes, setAttributes }) {
    const { cellColor, cellBg, tableCellBorder } = attributes;
    // table border
    const borderWidth = tableCellBorder ? generateBorderWidth(tableCellBorder) : null;
    const borderStyle = tableCellBorder ? generateBorderStyle(tableCellBorder) : null;
    const borderColor = tableCellBorder ? generateBorderColor(tableCellBorder) : null;

    const cssCustomProperties = {
        ...(cellColor && { '--tdcolor': cellColor }),
        ...(cellBg && { '--tdbg': cellBg }),
        ...(borderWidth && { '--crow-width': borderWidth }),
        ...(borderStyle && { '--crow-style': borderStyle }),
        ...(borderColor && { '--crow-color': borderColor })
    };

    const blockProps = useBlockProps({ style: cssCustomProperties });
    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        template: [['core/paragraph', {}]]
    });

    useEffect(() => {
        setAttributes({
            blockStyle: cssCustomProperties
        });
    }, [cellColor, cellBg, tableCellBorder]);

    return (
        <>
            <InspectorControls>
                <PanelColorSettings
                    title={__('Colors', 'yen-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: cellColor,
                            onChange: cellColor => setAttributes({ cellColor }),
                            label: __('Color', 'yen-blocks')
                        },
                        {
                            value: cellBg,
                            onChange: cellBg => setAttributes({ cellBg }),
                            label: __('Background', 'yen-blocks')
                        }
                    ]}
                />
                <ToolsPanel
                    label={__('Border', 'yen-blocks')}
                    resetAll={() =>
                        setAttributes({
                            tableCellBorder: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!tableCellBorder?.width || !!tableCellBorder?.color || !!tableCellBorder?.style}
                        label={__('Border', 'yen-blocks')}
                        onDeselect={() => {
                            setAttributes({
                                tableCellBorder: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeBorderBoxControl
                            label={__('Border', 'yen-blocks')}
                            value={tableCellBorder}
                            onChange={border => setAttributes({ tableCellBorder: border })}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
            </InspectorControls>
            <td {...innerBlocksProps} />
        </>
    );
}
