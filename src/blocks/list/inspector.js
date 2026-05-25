import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { PanelColorControl, NativeSelectControl, NativeUnitControl, NativeTextControl } from '../../components';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const { headingTag, headingColor, itemGap, mobileIcon, listFontSize, headingFontSize, iconSize, mobileIconSize } = attributes;

    return (
        <InspectorControls>
            <PanelBody title={__('Settings', 'yen-blocks')}>
                <NativeSelectControl
                    label={__('Heading Tag', 'yen-blocks')}
                    value={headingTag}
                    onChange={value => setAttributes({ headingTag: value })}
                    options={[
                        { label: 'H1', value: 'h1' },
                        { label: 'H2', value: 'h2' },
                        { label: 'H3', value: 'h3' },
                        { label: 'H4', value: 'h4' },
                        { label: 'H5', value: 'h5' },
                        { label: 'H6', value: 'h6' },
                        { label: 'Paragraph', value: 'p' }
                    ]}
                />
                <NativeUnitControl
                    label={__('Item Gap', 'yen-blocks')}
                    value={itemGap}
                    onChange={value => setAttributes({ itemGap: value })}
                />
                <NativeTextControl
                    label={__('Mobile Icon (SVG)', 'yen-blocks')}
                    value={mobileIcon}
                    onChange={value => setAttributes({ mobileIcon: value })}
                    placeholder={__('Paste SVG for mobile heading...', 'yen-blocks')}
                />
                { mobileIcon && (
                    <NativeUnitControl
                        label={__('Mobile Icon Size', 'yen-blocks')}
                        value={mobileIconSize}
                        onChange={value => setAttributes({ mobileIconSize: value })}
                    />
                ) }
            </PanelBody>
            <PanelBody title={__('Typography', 'yen-blocks')} initialOpen={false}>
                <NativeUnitControl
                    label={__('Heading Font Size', 'yen-blocks')}
                    value={headingFontSize}
                    onChange={value => setAttributes({ headingFontSize: value })}
                />
                <NativeUnitControl
                    label={__('List Font Size', 'yen-blocks')}
                    value={listFontSize}
                    onChange={value => setAttributes({ listFontSize: value })}
                />
                <NativeUnitControl
                    label={__('Icon Size', 'yen-blocks')}
                    value={iconSize}
                    onChange={value => setAttributes({ iconSize: value })}
                />
            </PanelBody>
            <PanelBody title={__('Colors', 'yen-blocks')} initialOpen={false}>
                <PanelColorControl
                    title={__('Colors', 'yen-blocks')}
                    colorSettings={[
                        {
                            value: headingColor,
                            onChange: color => setAttributes({ headingColor: color }),
                            label: __('Heading Color', 'yen-blocks')
                        }
                    ]}
                />
            </PanelBody>
        </InspectorControls>
    );
};

export default Inspector;
