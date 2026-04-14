import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, Button, ToggleControl, TextareaControl } from '@wordpress/components';
import { PanelColorControl, NativeRangeControl } from '../../components';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const { url, linkTarget, rel, icon, iconPos, iconGap, btnColors } = attributes;

    return (
        <>
            <InspectorControls group="settings">
                <PanelBody title={__('Content', 'yen-blocks')}>
                    <TextControl label={__('Link', 'yen-blocks')} value={url} onChange={val => setAttributes({ url: val })} />
                    <ToggleControl
                        label={__('Open in new tab', 'yen-blocks')}
                        checked={linkTarget === '_blank'}
                        onChange={val => setAttributes({ linkTarget: val ? '_blank' : '' })}
                    />
                    <TextControl
                        label={__('Rel Attribute', 'yen-blocks')}
                        value={rel}
                        onChange={val => setAttributes({ rel: val })}
                        help={__(
                            'Specify the relationship between the current document and the linked document. Common values include "noopener" and "noreferrer".',
                            'yen-blocks'
                        )}
                    />
                    <TextareaControl
                        label={__('Icon SVG Code', 'yen-blocks')}
                        onChange={v => setAttributes({ icon: v })}
                        value={icon}
                        help={__('Paste your SVG code here. Make sure to include the entire <svg> element.', 'yen-blocks')}
                    />
                    <div style={{ margin: '1em 0' }}>
                        <a href="https://fonts.google.com/icons">{__('See Google Icons', 'yen-blocks')}</a>
                    </div>
                    {icon && (
                        <>
                            <SelectControl
                                label={__('Position', 'yen-blocks')}
                                value={iconPos}
                                options={[
                                    { label: __('Left', 'yen-blocks'), value: 'left' },
                                    { label: __('Right', 'yen-blocks'), value: 'right' }
                                ]}
                                onChange={val => setAttributes({ iconPos: val })}
                            />
                        </>
                    )}
                </PanelBody>
            </InspectorControls>

            <InspectorControls group="styles">
                <PanelColorControl
                    title={__('Colors', 'yen-blocks')}
                    colorSettings={[
                        {
                            value: btnColors.text,
                            onChange: val => setAttributes({ btnColors: { ...btnColors, text: val } }),
                            label: __('Text', 'yen-blocks')
                        },
                        {
                            value: btnColors.background,
                            onChange: val => setAttributes({ btnColors: { ...btnColors, background: val } }),
                            label: __('Background', 'yen-blocks')
                        },
                        {
                            value: btnColors.hoverColor,
                            onChange: val => setAttributes({ btnColors: { ...btnColors, hoverColor: val } }),
                            label: __('Hover Text', 'yen-blocks')
                        },
                        {
                            value: btnColors.hoverBg,
                            onChange: val => setAttributes({ btnColors: { ...btnColors, hoverBg: val } }),
                            label: __('Hover Background', 'yen-blocks')
                        }
                    ]}
                />
            </InspectorControls>
        </>
    );
};

export default Inspector;
