import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { PanelColorControl, NativeUnitControl, NativeToggleGroupControl, NativeSelectControl } from '../../components';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const { 
        titleTag, 
        titleColor, 
        lineColor,
        separatorHeight,
        alignment,
        titleSize
    } = attributes;

    return (
        <InspectorControls>
            <PanelBody title={__('Settings', 'yen-blocks')}>
                <NativeSelectControl
                    label={__('Title Tag', 'yen-blocks')}
                    value={titleTag}
                    onChange={value => setAttributes({ titleTag: value })}
                    options={[
                        { label: __('H1', 'yen-blocks'), value: 'h1' },
                        { label: __('H2', 'yen-blocks'), value: 'h2' },
                        { label: __('H3', 'yen-blocks'), value: 'h3' },
                        { label: __('H4', 'yen-blocks'), value: 'h4' },
                        { label: __('H5', 'yen-blocks'), value: 'h5' },
                        { label: __('H6', 'yen-blocks'), value: 'h6' },
                        { label: __('Paragraph', 'yen-blocks'), value: 'p' },
                        { label: __('Div', 'yen-blocks'), value: 'div' },
                        { label: __('Span', 'yen-blocks'), value: 'span' },
                    ]}
                />
                <NativeToggleGroupControl
                    label={__('Alignment', 'yen-blocks')}
                    value={alignment}
                    onChange={value => setAttributes({ alignment: value })}
                    options={[
                        { label: __('Left', 'yen-blocks'), value: 'left' },
                        { label: __('Center', 'yen-blocks'), value: 'center' },
                        { label: __('Right', 'yen-blocks'), value: 'right' }
                    ]}
                />
            </PanelBody>
            <PanelBody title={__('Styles', 'yen-blocks')} initialOpen={false}>
                <NativeUnitControl
                    label={__('Font Size', 'yen-blocks')}
                    value={titleSize}
                    onChange={value => setAttributes({ titleSize: value })}
                />
                <NativeUnitControl
                    label={__('Separator Height', 'yen-blocks')}
                    value={separatorHeight}
                    onChange={value => setAttributes({ separatorHeight: value })}
                />
                <PanelColorControl
                    title={__('Style Colors', 'yen-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: titleColor,
                            onChange: color => setAttributes({ titleColor: color }),
                            label: __('Title Color', 'yen-blocks')
                        },
                        {
                            value: lineColor,
                            onChange: color => setAttributes({ lineColor: color }),
                            label: __('Line Color', 'yen-blocks')
                        }
                    ]}
                />
            </PanelBody>
        </InspectorControls>
    );
};

export default Inspector;
