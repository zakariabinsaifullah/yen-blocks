import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { PanelColorControl, NativeTextControl, NativeUnitControl } from '../../components';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const { icon, textColor, iconColor, iconGap } = attributes;

    return (
        <InspectorControls>
            <PanelBody title={__('Settings', 'yen-blocks')}>
                <NativeTextControl
                    label={__('Icon (SVG)', 'yen-blocks')}
                    value={icon}
                    onChange={value => setAttributes({ icon: value })}
                    placeholder={__('Paste SVG markup here...', 'yen-blocks')}
                />
                <NativeUnitControl
                    label={__('Icon Gap', 'yen-blocks')}
                    value={iconGap}
                    onChange={value => setAttributes({ iconGap: value })}
                />
            </PanelBody>
            <PanelBody title={__('Colors', 'yen-blocks')} initialOpen={false}>
                <PanelColorControl
                    title={__('Item Colors', 'yen-blocks')}
                    colorSettings={[
                        {
                            value: textColor,
                            onChange: color => setAttributes({ textColor: color }),
                            label: __('Text Color', 'yen-blocks')
                        },
                        {
                            value: iconColor,
                            onChange: color => setAttributes({ iconColor: color }),
                            label: __('Icon Color', 'yen-blocks')
                        }
                    ]}
                />
            </PanelBody>
        </InspectorControls>
    );
};

export default Inspector;
