import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    __experimentalToolsPanel as ToolsPanel, // eslint-disable-line
    __experimentalToolsPanelItem as ToolsPanelItem // eslint-disable-line
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';

import { ALIGNS } from './constants';

import {
    NativeBorderBoxControl,
    PanelColorControl,
    NativeToggleControl,
    NativeToggleGroupControl,
    NativeUnitControl,
    NativeBoxControl
} from '../../components';

const Inspector = props => {
    const { attributes, setAttributes, clientId } = props;
    const {
        hasHeader,
        hasFooter,
        isFixedLayout,
        tableBg,
        tableColor,
        tableBorder,
        cellPadding,
        alignment,
        theadBg,
        theadColor,
        tfootBg,
        tfootColor,
        stripedColor,
        stripedBg,
        tableCellBorder,
        tableCellRadius,
        tableRowBorder,
        headPadding,
        headBorder,
        cheadBorder,
        footerBorder,
        cfooterBorder,
        shSpacing,
        svSpacing,
        thFontSize,
        tfFontSize,
        tableRowGap
    } = attributes;

    const blockClass = useSelect(
        select => {
            const block = select('core/block-editor').getBlock(clientId);
            return block?.attributes?.className || '';
        },
        [clientId]
    );

    return (
        <>
            <InspectorControls group="settings">
                <PanelBody title={__('Settings', 'yen-blocks')}>
                    <NativeToggleControl
                        label={__('Fixed width table cells', 'yen-blocks')}
                        checked={isFixedLayout}
                        onChange={value => setAttributes({ isFixedLayout: value })}
                    />
                    <NativeToggleControl
                        label={__('Show table header section', 'yen-blocks')}
                        checked={hasHeader}
                        onChange={value => setAttributes({ hasHeader: value })}
                    />
                    <NativeToggleControl
                        label={__('Show table footer section', 'yen-blocks')}
                        checked={hasFooter}
                        onChange={value => setAttributes({ hasFooter: value })}
                    />
                    <NativeToggleGroupControl
                        label={__('Alignment', 'yen-blocks')}
                        value={alignment}
                        onChange={value => setAttributes({ alignment: value })}
                        options={ALIGNS}
                    />
                </PanelBody>
            </InspectorControls>
            <InspectorControls group="styles">
                <ToolsPanel
                    label={__('Table', 'yen-blocks')}
                    resetAll={() =>
                        setAttributes({
                            tableColor: undefined,
                            tableBg: undefined,
                            tableBorder: undefined,
                            shSpacing: undefined,
                            svSpacing: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!tableColor || !!tableBg}
                        label={__('Colors', 'yen-blocks')}
                        onDeselect={() => {
                            setAttributes({
                                tableColor: undefined,
                                tableBg: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Colors', 'yen-blocks')}
                            colorSettings={[
                                {
                                    value: tableColor,
                                    onChange: color => setAttributes({ tableColor: color }),
                                    label: __('Text Color', 'yen-blocks')
                                },
                                {
                                    value: tableBg,
                                    onChange: color => setAttributes({ tableBg: color }),
                                    label: __('Background Color', 'yen-blocks')
                                }
                            ]}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => !!tableBorder?.width || !!tableBorder?.color || !!tableBorder?.style}
                        label={__('Border', 'yen-blocks')}
                        onDeselect={() => {
                            setAttributes({
                                tableBorder: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeBorderBoxControl
                            label={__('Border', 'yen-blocks')}
                            value={tableBorder}
                            onChange={border => setAttributes({ tableBorder: border })}
                        />
                    </ToolsPanelItem>
                    {blockClass?.includes('is-style-separated') && (
                        <ToolsPanelItem
                            hasValue={() => !!shSpacing || !!svSpacing}
                            label={__('Border Spacing', 'yen-blocks')}
                            onDeselect={() => {
                                setAttributes({
                                    shSpacing: undefined,
                                    svSpacing: undefined
                                });
                            }}
                            onSelect={() => {}}
                        >
                            <NativeUnitControl
                                label={__('H. Spacing', 'yen-blocks')}
                                value={shSpacing}
                                onChange={value => {
                                    setAttributes({ shSpacing: value });
                                }}
                            />
                            <NativeUnitControl
                                label={__('V. Spacing', 'yen-blocks')}
                                value={svSpacing}
                                onChange={value => {
                                    setAttributes({ svSpacing: value });
                                }}
                            />
                        </ToolsPanelItem>
                    )}
                </ToolsPanel>

                {blockClass?.includes('is-style-striped') && (
                    <ToolsPanel
                        label={__('Striped Rows', 'yen-blocks')}
                        resetAll={() =>
                            setAttributes({
                                stripedColor: undefined,
                                stripedBg: undefined
                            })
                        }
                    >
                        <ToolsPanelItem
                            hasValue={() => !!stripedColor || !!stripedBg}
                            label={__('Colors', 'yen-blocks')}
                            onDeselect={() => {
                                setAttributes({
                                    stripedColor: undefined,
                                    stripedBg: undefined
                                });
                            }}
                            onSelect={() => {}}
                        >
                            <PanelColorControl
                                label={__('Colors', 'yen-blocks')}
                                colorSettings={[
                                    {
                                        value: stripedColor,
                                        onChange: color => setAttributes({ stripedColor: color }),
                                        label: __('Text Color', 'yen-blocks')
                                    },
                                    {
                                        value: stripedBg,
                                        onChange: color => setAttributes({ stripedBg: color }),
                                        label: __('Background Color', 'yen-blocks')
                                    }
                                ]}
                            />
                        </ToolsPanelItem>
                    </ToolsPanel>
                )}
                <ToolsPanel
                    label={__('Table Cell', 'yen-blocks')}
                    resetAll={() =>
                        setAttributes({
                            cellPadding: undefined,
                            tableCellBorder: undefined,
                            tableCellRadius: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!cellPadding?.top || !!cellPadding?.right || !!cellPadding?.bottom || !!cellPadding?.left}
                        label={__('Padding', 'yen-blocks')}
                        onDeselect={() => {
                            setAttributes({
                                cellPadding: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeBoxControl
                            label={__('Padding', 'yen-blocks')}
                            value={cellPadding}
                            onChange={padding => {
                                setAttributes({ cellPadding: padding });
                            }}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() =>
                            !!tableCellRadius?.top || !!tableCellRadius?.right || !!tableCellRadius?.bottom || !!tableCellRadius?.left
                        }
                        label={__('Radius', 'yen-blocks')}
                        onDeselect={() => {
                            setAttributes({
                                tableCellRadius: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeBoxControl
                            label={__('Radius', 'yen-blocks')}
                            value={tableCellRadius}
                            onChange={radius => {
                                setAttributes({ tableCellRadius: radius });
                            }}
                        />
                    </ToolsPanelItem>

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
                <ToolsPanel
                    label={__('Table Row', 'yen-blocks')}
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
                    <ToolsPanelItem
                        hasValue={() => !!tableRowGap}
                        label={__('Row Gap', 'yen-blocks')}
                        onDeselect={() => {
                            setAttributes({ tableRowGap: undefined });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeUnitControl
                            label={__('Row Gap', 'yen-blocks')}
                            value={tableRowGap}
                            onChange={value => setAttributes({ tableRowGap: value })}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
                <ToolsPanel
                    label={__('Table Head', 'yen-blocks')}
                    resetAll={() =>
                        setAttributes({
                            theadColor: undefined,
                            theadBg: undefined,
                            headPadding: undefined,
                            thFontSize: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!thFontSize}
                        label={__('Font Size', 'yen-blocks')}
                        onDeselect={() => {
                            setAttributes({
                                thFontSize: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeUnitControl
                            label={__('Font Size', 'yen-blocks')}
                            value={thFontSize}
                            onChange={value => {
                                setAttributes({ thFontSize: value });
                            }}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => !!theadColor || !!theadBg}
                        label={__('Colors', 'yen-blocks')}
                        onDeselect={() => {
                            setAttributes({
                                theadColor: undefined,
                                theadBg: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Colors', 'yen-blocks')}
                            colorSettings={[
                                {
                                    value: theadColor,
                                    onChange: color => setAttributes({ theadColor: color }),
                                    label: __('Text Color', 'yen-blocks')
                                },
                                {
                                    value: theadBg,
                                    onChange: color => setAttributes({ theadBg: color }),
                                    label: __('Background Color', 'yen-blocks')
                                }
                            ]}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => !!headPadding?.top || !!headPadding?.right || !!headPadding?.bottom || !!headPadding?.left}
                        label={__('Padding', 'yen-blocks')}
                        onDeselect={() => {
                            setAttributes({
                                headPadding: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeBoxControl
                            label={__('Padding', 'yen-blocks')}
                            value={headPadding}
                            onChange={padding => {
                                setAttributes({ headPadding: padding });
                            }}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => !!headBorder?.width || !!headBorder?.color || !!headBorder?.style}
                        label={__('Row Border', 'yen-blocks')}
                        onDeselect={() => {
                            setAttributes({
                                headBorder: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeBorderBoxControl
                            label={__('Row Border', 'yen-blocks')}
                            value={headBorder}
                            onChange={border => setAttributes({ headBorder: border })}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => !!cheadBorder?.width || !!cheadBorder?.color || !!cheadBorder?.style}
                        label={__('Cell Border', 'yen-blocks')}
                        onDeselect={() => {
                            setAttributes({
                                cheadBorder: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeBorderBoxControl
                            label={__('Cell Border', 'yen-blocks')}
                            value={cheadBorder}
                            onChange={border => setAttributes({ cheadBorder: border })}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
                <ToolsPanel
                    label={__('Table Footer', 'yen-blocks')}
                    resetAll={() =>
                        setAttributes({
                            tfootColor: undefined,
                            tfootBg: undefined,
                            tfFontSize: undefined,
                            footerBorder: undefined,
                            cfooterBorder: undefined
                        })
                    }
                >
                    <ToolsPanelItem
                        hasValue={() => !!tfFontSize}
                        label={__('Font Size', 'yen-blocks')}
                        onDeselect={() => {
                            setAttributes({
                                tfFontSize: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeUnitControl
                            label={__('Font Size', 'yen-blocks')}
                            value={tfFontSize}
                            onChange={value => {
                                setAttributes({ tfFontSize: value });
                            }}
                            mb={0}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => !!tfootColor || !!tfootBg}
                        label={__('Colors', 'yen-blocks')}
                        onDeselect={() => {
                            setAttributes({
                                tfootColor: undefined,
                                tfootBg: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <PanelColorControl
                            label={__('Colors', 'yen-blocks')}
                            colorSettings={[
                                {
                                    value: tfootColor,
                                    onChange: color => setAttributes({ tfootColor: color }),
                                    label: __('Text Color', 'yen-blocks')
                                },
                                {
                                    value: tfootBg,
                                    onChange: color => setAttributes({ tfootBg: color }),
                                    label: __('Background Color', 'yen-blocks')
                                }
                            ]}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => !!footerBorder?.width || !!footerBorder?.color || !!footerBorder?.style}
                        label={__('Row Border', 'yen-blocks')}
                        onDeselect={() => {
                            setAttributes({
                                footerBorder: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeBorderBoxControl
                            label={__('Row Border', 'yen-blocks')}
                            value={footerBorder}
                            onChange={border => setAttributes({ footerBorder: border })}
                        />
                    </ToolsPanelItem>
                    <ToolsPanelItem
                        hasValue={() => !!cfooterBorder?.width || !!cfooterBorder?.color || !!cfooterBorder?.style}
                        label={__('Cell Border', 'yen-blocks')}
                        onDeselect={() => {
                            setAttributes({
                                cfooterBorder: undefined
                            });
                        }}
                        onSelect={() => {}}
                    >
                        <NativeBorderBoxControl
                            label={__('Cell Border', 'yen-blocks')}
                            value={cfooterBorder}
                            onChange={border => setAttributes({ cfooterBorder: border })}
                        />
                    </ToolsPanelItem>
                </ToolsPanel>
            </InspectorControls>
        </>
    );
};

export default Inspector;
