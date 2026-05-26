import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { PanelColorControl, NativeUnitControl, NativeToggleGroupControl, NativeSelectControl } from '../../components';

const Inspector = props => {
    const { attributes, setAttributes } = props;
    const {
        lineColor,
        iconColor
    } = attributes;

    return (
        <InspectorControls>
            <PanelBody title={__('Setting', 'yen-blocks')} initialOpen={true}>
                <PanelColorControl
                    title={__('Style Colors', 'yen-blocks')}
                    initialOpen={false}
                    colorSettings={[
                        {
                            value: lineColor,
                            onChange: color => setAttributes({ lineColor: color }),
                            label: __('Line Color', 'yen-blocks')
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
